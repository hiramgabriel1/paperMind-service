import { NextFunction, Router } from "express";
import { Response, Request } from "express";
import { ChatController } from "../controllers/chat.controller";
import upload from "../middlewares/multer.middleware";

const chatRouter = Router();
const chatController = new ChatController();
const path = "/api/v1";

chatRouter.post(
    `${path}/chat/create-new`,
    (req: Request, res: Response, next: NextFunction) => {
        console.log("Middleware de multer ejecutado");
        console.log(req.body);
        next();
    },
    upload,
    (req: Request, res: Response) => chatController.createChat(req, res)
);

export default chatRouter;
