import mongoose from "mongoose"

const { Schema } = mongoose;


const OrderSchema = new Schema({


    status: {
        type: String,
        enum: ["active", "completed"],
        default: "completed"

    }
    ,
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
            quantity: { type: Number, default: 1 }
        }
    ]

}, { timestamps: true })
const OrderModel = model("Order", OrderSchema);
model.exports = { OrderModel, OrderSchema };