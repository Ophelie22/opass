import { Router } from "express";
import { 
    getAllUsers,
    getUserById,
    updatedUserById,
    deleteUserById,
} from "../controllers/user.controller";

const UserRouter = Router ();

UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", getUserById);
UserRouter.put("/:id", updatedUserById);
UserRouter.delete("/:id", deleteUserById);

export default UserRouter;
