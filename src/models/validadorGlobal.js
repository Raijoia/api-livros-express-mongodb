import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({ path }) => `O valor do campo ${path} não pode ser vazio.`
});