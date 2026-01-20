const { Server } = require("socket.io");
const messageSent = require("../modules/message");
const codeSave = require("../modules/code");
const roleModel = require("../modules/role");
// const user = require("../modules/user");
function initSocket(server) {
  const io = new Server(server);

  let roomUsers = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", async ({ roomId, name }) => {
      socket.join(roomId);
      console.log(name);

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }
      roomUsers[roomId] = roomUsers[roomId].filter(
        (user) => user.socketId !== socket.id,
      );
      const newId = Math.floor(100 + Math.random() * 900);

      const alreadyExists = roomUsers[roomId].some(
        (user) => user.username === name,
      );
      if (alreadyExists) {
        socket.emit(
          "join-error",
          `Username already taken in this room. Try this instead: ${name}${newId}`,
        );

        console.log("already there mate");
        return;
        // ❌ reject join
      }
      roomUsers[roomId].push({
        socketId: socket.id,
        username: name,
      });

      io.to(roomId).emit("room-users", roomUsers[roomId]);

      let room = await roleModel.findOne({ roomId });
      console.log("room", room);
      ////////////////////// this is the leave room ////////////////////////////
      socket.on("leave-room", async (roomId, name, secHost) => {
        for (const roomId in roomUsers) {
          roomUsers[roomId] = roomUsers[roomId].filter(
            (user) => user.socketId !== socket.id,
          );
          io.to(roomId).emit("room-users", roomUsers[roomId]);
        }

        if (name === room.hostUsername) {
          const remainingUsers = roomUsers[roomId];
          if (remainingUsers.length > 0) {
            const newHost = remainingUsers[0].username;
            await roleModel.findOneAndUpdate(
              { roomId }, // find code by room
              { hostUsername: newHost }, // replace old code with new code
            );
            io.to(roomId).emit("room-info", {
              hostUsername: newHost,
            });
            io.to(roomId).emit("host-changed", {
              oldHost: room.hostUsername,
              newHost,
            });
          }
          // console.log("i am all users", newHost);
        }
      });

      if (!room) {
        room = await roleModel.findOneAndUpdate(
          { roomId },
          {
            $setOnInsert: {
              roomId,
              hostUsername: name,
              editableUsers: [name],
              isLocked: false,
            },
          },
          { upsert: true, new: true },
        );
      }
      console.log("room users", roomUsers);

      socket.emit("room-info", {
        hostUsername: room.hostUsername,
        editableUsers: room.editableUsers,
        isLocked: room.isLocked,
        name,
        language: room.language,
      });

      const messages = await messageSent.find({ roomId });
      socket.emit("previous-messages", messages);

      const savedCode = await codeSave.findOne({ roomId });
      // console.log("previous-code", savedCode);

      socket.emit("previous-code", savedCode?.code || "");

      socket.on("disconnect", () => {
        for (const roomId in roomUsers) {
          roomUsers[roomId] = roomUsers[roomId].filter(
            (user) => user.socketId !== socket.id,
          );

          io.to(roomId).emit("room-users", roomUsers[roomId]);
        }
      });
    });
    // till herer

    socket.on("create-room", async ({ roomId, hostUsername, language }) => {
      const room = await roleModel.create({
        roomId,
        hostUsername,
        language,
      });
      socket.emit("room-created", {
        roomId,
        hostUsername,
        language,
      });
      console.log("room created", room);
    });

    socket.on("send-message", async ({ roomId, username, message }) => {
      const msg = await messageSent.create({ roomId, username, message });
      console.log(msg);
      io.to(roomId).emit("receive-message", msg);
    });

    socket.on("edit-user", async (name, username, roomId) => {
      let room = await roleModel.findOne({ roomId });
      if (room.hostUsername !== name) return;
      await roleModel.findOneAndUpdate(
        { roomId }, // find code by room
        { $addToSet: { editableUsers: username } }, // replace old code with new code
      );

      const updatedRoom = await roleModel.findOne({ roomId });
      io.to(roomId).emit("room-info", {
        hostUsername: updatedRoom.hostUsername,
        editableUsers: updatedRoom.editableUsers,
        isLocked: updatedRoom.isLocked,
      });
    });

    socket.on("remove-user", async (name, user, roomId) => {
      let room = await roleModel.findOne({ roomId });
      if (room.hostUsername !== name) return;
      await roleModel.findOneAndUpdate(
        { roomId }, // find code by room
        { $pull: { editableUsers: user } }, // replace old code with new code
      );
      const updatedRoom = await roleModel.findOne({ roomId });
      io.to(roomId).emit("room-info", {
        hostUsername: updatedRoom.hostUsername,
        editableUsers: updatedRoom.editableUsers,
        isLocked: updatedRoom.isLocked,
      });

      console.log("remove", user);
    });

    socket.on("run-code", async ({ code, roomId }) => {
      await codeSave.findOneAndUpdate({ roomId }, { code }, { upsert: true });
      console.log("i am create code", code);

      socket.to(roomId).emit("display-code", code);
    });
  });
}

module.exports = initSocket;
