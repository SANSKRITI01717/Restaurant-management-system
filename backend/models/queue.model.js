import mongoose from "mongoose"

const { Schema } = mongoose;

const QueueSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["waiting", "seated"],
    default: "waiting"
  }
}, { timestamps: true });

const QueueModel = model("Queeu", QueueSchema);
model.exports = { QueueModel,QueueSchema};