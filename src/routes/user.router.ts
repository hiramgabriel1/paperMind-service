import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";

const path = "/api/v1/user";
const userRouter = Router();
const userController = new UserController();

userRouter.post(`${path}/create-user`, (req: Request, res: Response) =>
    userController.registerUser(req, res)
);

userRouter.post(`${path}/login`, (req: Request, res: Response) =>
    userController.loginUser(req, res)
);

userRouter.delete(`${path}/remove-user`, (req: Request, res: Response) =>
    userController.removeUser(req, res)
);

userRouter.get(`${path}/`, (req: Request, res: Response) =>
    userController.users(req, res)
);

userRouter.get(`${path}/my-chats/:userId`, (req: Request, res: Response) =>
    userController.myChats(req, res)
);

export default userRouter;
