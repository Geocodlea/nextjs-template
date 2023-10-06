import mongoose from "mongoose";

global.models = global.models || {};

global.models.User =
  global.models.User ||
  mongoose.model("User", {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String },
    image: { type: String },
    role: { type: String },
  });

export default global.models.User;
