import { Router} from "express";
import { createTable,markTableEmpty,getAllTables } from "../controllers/table.controller.js";
import { verifytoken,isAdmin } from "../middlewares/auth.middleware.js";
const router=Router()

router.post("/createTable",verifytoken,isAdmin,createTable);
router.post("/emptyTable",verifytoken,isAdmin,markTableEmpty);
router.get("/showTables",verifytoken,getAllTables)

export default router