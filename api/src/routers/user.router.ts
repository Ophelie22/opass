import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    updatedUserById,
    deleteUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updatedUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
