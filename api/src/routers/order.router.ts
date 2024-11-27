import { Router } from "express";
import {
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderById,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrderById);
orderRouter.delete("/:id", deleteOrderById);

export default orderRouter;