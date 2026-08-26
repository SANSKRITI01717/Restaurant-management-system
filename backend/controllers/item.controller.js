import { ItemModel } from "../models/item.model.js"
import httpStatus from "http-status"
const createItem = async (req, res) => {
    try {
        const { name, price, imageURL } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "please provide valid details!" })
        }
        const newItem = new ItemModel({
            name: name,
            price: price,
            imageURL: imageURL
        })
        await newItem.save();
        res.status(httpStatus.CREATED).json({ message: "item added " })


    } catch (e) {
        return res.status(500).json({ message: " Something went wrong" })
    }
}

const getAllItems=async(req,res)=>{
    try{
     const allitems=await ItemModel.find({});
     return res.status(200).json({allitems})
    }catch(e){
                return res.status(500).json({ message: " Something went wrong" })
    }
}

const updateItem = async (req, res) => {
  try {
    const { itemId, name, price, imageURL } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: "please provide a valid item id" });
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { name, price, imageURL },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(400).json({ message: "this item does not exist" });
    }

    return res.status(200).json({ message: "item updated", item: updatedItem });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: "please provide a valid item id" });
    }

    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(400).json({ message: "this item does not exist" });
    }

    return res.status(200).json({ message: "item deleted" });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
export {createItem,getAllItems,updateItem,deleteItem}