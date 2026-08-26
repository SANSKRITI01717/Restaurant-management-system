import { Router} from "express";
import {createItem,getAllItems,updateItem,deleteItem} from "../controllers/item.controller.js"
import { verifytoken,isAdmin } from "../middlewares/auth.middleware.js";
const router=Router()

router.post("/createItem",verifytoken,isAdmin,createItem);
router.get("/showItems",verifytoken,getAllItems)
router.put("/updateItem", verifytoken, isAdmin, updateItem)
router.delete("/deleteItem", verifytoken, isAdmin, deleteItem)

export default router