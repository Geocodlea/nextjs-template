import mongoose from "mongoose";

global.models = global.models || {};

global.models.Event =
  global.models.Event ||
  mongoose.model("Event", {
    id: { type: Number, required: true },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: Date },
  });

export default global.models.Event;
