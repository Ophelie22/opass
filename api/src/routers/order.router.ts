import { Router } from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderById,
  getOrdersByUserId
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:orderId", getOrderById);
orderRouter.put("/:orderId", updateOrderById);
orderRouter.delete("/:orderId", deleteOrderById);
orderRouter.get("/user/:userId", getOrdersByUserId);

export default orderRouter;