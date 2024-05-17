const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    task: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
  },
  { collection: "tasks" }
);

const model = mongoose.model("list", Task);

module.exports = model;
