import { Request, Response } from "express";
import { prisma } from "../prisma/prisma.service";
import cloudinary from "../config/cloudinary.config";
import { IChatType } from "../types/chat.interface";
import fs from "fs";


export class ChatController {
    async createChat(req: Request, res: Response) {
        try {
            const userId = req.params.userId
            const pathFile: any = req.file?.path;
            const resultData = await cloudinary.uploader.upload(pathFile, {
                resource_type: "auto",
            });

            const dataChat = { ...req.body, urlPdf: resultData.secure_url, userId: userId };
            const saveChat = await prisma.chat.create({
                data: dataChat,
            });

            if (!saveChat)
                return res.status(500).json({ message: "error al guardar la data" });

            console.log(saveChat);
            
            res.status(200).json({ message: "creado", data: saveChat });

            // fs.unlinkSync(pathFile);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ error: error });
        }
    }

    async show(req: Request, res: Response){
        const data = await prisma.chat.findMany()
        res.json({ data })
    }
}
