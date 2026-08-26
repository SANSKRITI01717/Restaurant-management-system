import { Router} from "express";
import { login, register } from "../controllers/user.controller.js"
import { verifytoken } from "../middlewares/auth.middleware.js";
const router=Router()
router.post("/login",login);
router.post("/register",register);
router.post("/profile",verifytoken,(req,res)=>{
     return res.status(200).json({ 
        message: "Welcome to your profile", 
        user: req.user 
     })
})
export default router

