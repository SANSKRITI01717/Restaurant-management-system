
import httpStatus from "http-status"
import { TableModel } from "../models/table.model.js"
import { OrderModel } from "../models/order.model.js"
const placeOrder = async (req, res) => {
    try {
        const { tableId, items } = req.body;
        if (!tableId || !items || items.length === 0) {
            return res.status(400).json({ message: "please provide tableId and items" });
        }

        const table = await TableModel.findById(tableId);
        if (!table) {
            return res.status(400).json({ message: "invalid table" });
        }
        if (table.status !== "empty") {
            return res.status(400).json({ message: "table is not available" });
        }
        if (table.status === "reserved" && table.reservedForUserId.toString() !== req.user.id) {
            return res.status(403).json({ message: "this table is reserved for another customer" });
        }
        if (table.status === "occupied") {
            return res.status(400).json({ message: "table is not available" });
        }

        const newOrder = new OrderModel({
            customerId: req.user.id,
            tableId: tableId,
            items: items,
            status: "active"
        });
        await newOrder.save();

        table.status = "occupied";
        table.currentOrderId = newOrder._id;
        await table.save();

        return res.status(201).json({ message: "order placed", order: newOrder });
    } catch (e) {
        return res.status(500).json({ message: "something went wrong" });
    }
};
const completeOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({ message: "please provide orderId" });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(400).json({ message: "invalid order" });
        }
        order.status = "completed";
        await order.save();

        const table = await TableModel.findById(order.tableId);
        table.status = "empty";
        table.currentOrderId = null;
        await table.save();

        return res.status(200).json({ message: "order completed, table freed" });
    } catch (e) {
        return res.status(500).json({ message: "something went wrong" });
    }
};
const getMyOrder = async (req, res) => {
    try {
        const { custmorId } = req.user.id;
        if (!custmorId) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "please provide the custId" })
        }
        const order = await OrderModel.find({ custmorId: custmorId });
        if (order.length === 0) {
            return res.status(400).json({ message: "order not found for this custid" });

        }
        return res.status(200).json({ order })
    } catch (e) {
        return res.status(500).json({ message: "something went wrong " })
    }
}
export { placeOrder, completeOrder, getMyOrder }