import mongoose from "mongoose"

const { Schema } = mongoose;


const TableSchema = new Schema({
   
    tableNumber: {
        type: Number,
        required: true,
    },
   
  status:{
      type: String,
  enum: ["empty", "occupied", "reserved"],
  default: "empty"

  }
  ,currentOrderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Order",
  default: null
},
reservedForUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
}


})
const TableModel = model("Table", TableSchema);
model.exports = { TableModel, TableSchema };