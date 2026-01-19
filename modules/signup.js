import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export default mongoose.models.signup || mongoose.model("signup", signupSchema);
