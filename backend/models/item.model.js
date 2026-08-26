import mongoose from "mongoose"

const { Schema } = mongoose;


const ItemSchema = new Schema({
   
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    },
  image:{
   type:URL,
   default:null
  }


})
const ItemModel = model("Item", ItemSchema);
model.exports = { ItemModel, ItemSchema };