import mongoose from "mongoose";

global.models = global.models || {};

const { Schema } = mongoose;

global.models.Account =
  global.models.Account ||
  mongoose.model("Account", {
    provider: { type: String },
    type: { type: String },
    providerAccountId: { type: String },
  });

export default global.models.Account;
