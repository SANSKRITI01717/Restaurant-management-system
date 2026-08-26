import jwt from "jsonwebtoken"

const verifytoken = async (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: " Unauthorized access" });

    }
    try {
        const decoded = jwt.verify(token, "SUPER_SECRET_KEY_DONT_SHARE");
        req.user = decoded;

        next();
    } catch (e) {
        return res.status(403).json({ message: " Something went wrong huh" })
    }
}
const isAdmin=async(req,res,next)=>{
    try{
         if(req.user.role==="admin"){
        next();
    }else{
        return res.status(400).json({message:"only admins are allowed"})
    }
    }catch(e){
        return res.status(403).json({message:"something went wrong "})
    }
  
}
export {verifytoken,isAdmin}