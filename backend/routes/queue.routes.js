import { Router} from "express";
import { joinQueue,getQueueStatus } from "../controllers/queue.controller.js";
import { verifytoken } from "../middlewares/auth.middleware.js";
const router=Router()
 

router.post("/joinQueue",verifytoken,joinQueue);
router.get("/showQueue",verifytoken,getQueueStatus);


export default router