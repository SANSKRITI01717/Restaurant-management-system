import { Router} from "express";
import { placeOrder,getMyOrder,completeOrder } from "../controllers/order.controller.js";
import { verifytoken,isAdmin } from "../middlewares/auth.middleware.js";
const router=Router()


router.post("/placeOrder",verifytoken,placeOrder);
router.get("/showMyOrder",verifytoken,getMyOrder);
router.post("/orderDone",verifytoken,isAdmin,completeOrder)


export default router