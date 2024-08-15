import { NextFunction, Router } from "express";
import { Response, Request } from "express";
import { ChatController } from "../controllers/chat.controller";
import upload from "../middlewares/multer.middleware";

const chatRouter = Router();
const chatController = new ChatController();
const path = "/api/v1/chat";

chatRouter.post(
  `${path}/create-new/:userId`,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware de multer ejecutado");
    next();
  },
  upload,
  (req: Request, res: Response) => chatController.createChat(req, res)
);

chatRouter.get(`${path}/`, (req: Request, res: Response) =>
  chatController.show(req, res)
);

export default chatRouter;
