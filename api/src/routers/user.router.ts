import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    //getCurrentUserProfile,
    createUser,
    updatedUserById,
    deleteUserById,
} from "../controllers/user.controller";
import authenticate from "../auth/auth.middleware";
const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
//userRouter.get("/profile", authenticate, getCurrentUserProfile);
userRouter.post("/", createUser);
userRouter.put("/:id", updatedUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;