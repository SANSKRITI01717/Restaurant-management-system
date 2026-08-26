import { UserModel } from "../models/user.model.js"
import httpStatus from "http-status"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please provide required details" })
    }
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "user must register before login!" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign(
                { id: user._id, username: user.username ,role:user.role},
                "SUPER_SECRET_KEY_DONT_SHARE",
                { expiresIn: "1d" }
            );
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: " Unauthorized access" });
        }
    } catch (e) {
        return res.status(400).json({ message: " Something went wrong" })

    }
}


const register = async (req, res) => {
    const { username, name, password, phone, email } = req.body;
    if (!username || !name || !password || !phone || !email) {
        return res.status(400).json({ message: "Please provide required details" })
    }
    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: " User already exist Please try another one" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone
        })
        
        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User registered" })
    } catch (e) {
        return res.status(400).json({ message: " Something went wrong" })
    }
}
export {login,register}