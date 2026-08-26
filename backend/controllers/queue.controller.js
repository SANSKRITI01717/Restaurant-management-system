
import {TableModel} from "../models/table.model"

const joinQueue = async (req, res) => {
  try {
    const emptyTable = await TableModel.findOne({ status: "empty" });
    if (emptyTable) {
      return res.status(400).json({ message: "a table is available, no need to queue" });
    }
    const newEntry = new QueueModel({ customerId: req.user.id });
    await newEntry.save();
    return res.status(201).json({ message: "added to queue" });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
};


const getQueueStatus = async (req, res) => {
  try {
    const waitingList = await QueueModel.find({ status: "waiting" }).sort({ createdAt: 1 });
    const myPosition = waitingList.findIndex(entry => entry.customerId.toString() === req.user.id);
    if (myPosition === -1) {
      return res.status(404).json({ message: "you are not in the queue" });
    }
    return res.status(200).json({ position: myPosition + 1 });
  } catch (e) {
    return res.status(500).json({ message: "something went wrong" });
  }
};


export {joinQueue,getQueueStatus}