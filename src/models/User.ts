import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

export default mongoose.model("User", UserSchema);
