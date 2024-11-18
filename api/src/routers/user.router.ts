import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    createUser,
    updatedUserById,
    deleteUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updatedUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
