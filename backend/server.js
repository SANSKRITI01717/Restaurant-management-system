import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose"; 
import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import orderRoutes from "./routes/order.routes.js";
import tableRoutes from "./routes/table.routes";
import queueRoutes from "./routes/queue.routes.js"
const app = express();


app.use(express.json()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/tables", tableRoutes);
app.use("/api/v1/queue", queueRoutes);



const URL = process.env.MONGO_URI || "mongodb://localhost:27017/myapp"; 
async function main() {
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error", err);
  }
}
main(); 

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
