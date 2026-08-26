import mongoose from "mongoose"

const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    }
    ,
    role: {
        type: String,
        enum: ["custmor", "admin"],
        default: "custmor"

    }
   

})
const UserModel = model("User", UserSchema);
model.exports = { UserModel, UserSchema };