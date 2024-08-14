import { Request, Response } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary.config";

export class ChatController {
    async createChat(req: Request, res: Response) {
        try {
            console.log(req.file);

            const pathFile: any = req.file?.path;
            const resultData = await cloudinary.uploader.upload(pathFile, {
                resource_type: "auto",
            });

            console.log(resultData);
            
            fs.unlinkSync(pathFile);
            res.json(resultData)
            // res.status(201).json({ message: "chat be created!", data: resultData });
        } catch (error) {
            console.log(error);

            return res.status(500).json({ error: error });
        }
    }
}
