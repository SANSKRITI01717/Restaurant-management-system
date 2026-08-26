
import {TableModel} from "../models/table.model.js"
import {QueueModel} from "../models/queue.model.js"
import httpStatus, { status } from "http-status"
const createTable=async(req,res)=>{
  
    try{
       const {tableNumber}=req.body;
       if(!tableNumber){
        return res.status(400).json({message:"please provide the table number"})
       }
               const newTable = new TableModel({
           tableNumber:tableNumber
        })
        await newTable.save();
        res.status(httpStatus.CREATED).json({ message: "table created" })
     
    }catch(e){
       return res.status(500).json({message:"something went wrong "})
    }
}

const getAllTables=async(req,res)=>{
    try {
    const tables = await TableModel.find({});
    res.status(200).json({ tables });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
}
const markTableEmpty=async(req,res)=>{
     try{
      const {tableNumber}=req.body;
       if(!tableNumber){
        return res.status(400).json({message:"please provide the table number"})
       }
       const table=await TableModel.findOne({tableNumber:tableNumber})
       if(!table){
                 return res.status(400).json({message:"please provide a valid table number"})
       }
     const nextInLine = await QueueModel.findOne({ status: "waiting" }).sort({ createdAt: 1 });

if (nextInLine) {
  table.status = "reserved";
  table.reservedForUserId = nextInLine.customerId;
  nextInLine.status = "seated";
  await nextInLine.save();
} else {
  table.status = "empty";
  table.reservedForUserId = null;
}
       table.currentOrderId=null;
       await table.save();
       res.status(200).json({message:"status updated Successfully"});
     }catch(e){
               return res.status(500).json({message:"something went wrong "})
     }
}
export {createTable,getAllTables,markTableEmpty}