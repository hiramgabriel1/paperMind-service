import { Request, Response } from "express";
import { comparePassword, HashPassword } from "../utils/hash.password";
import { IUser } from "../types/user.interface";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma.service";

export class UserController {
  private token: string = "";
  private secret: any = process.env.SECRET_KEY;

  private async userAlreadyExists(email: string): Promise<boolean> {
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return !!findUser;
  }

  public async registerUser(req: Request, res: Response) {
    try {
      const validateAccount = await this.userAlreadyExists(req.body.email);
      console.log(req.body.email);

      const hash = await HashPassword(req.body.password);
      const userData: IUser = { ...req.body, password: hash };

      if (validateAccount)
        return res.status(409).json({ message: "el usuario ya existe" });

      const user = await prisma.user.create({ data: userData });
      res.status(201).json({ message: "user be created", data: user });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const searchSession = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!searchSession)
        return res.status(404).json({ message: "User not found" });

      const isPasswordValid = await comparePassword(
        password,
        searchSession.password
      );

      if (!isPasswordValid)
        return res.status(401).json({ message: "Invalid password" });

      this.token = jwt.sign(
        {
          userId: searchSession.id,
          username: searchSession.username,
          lastname: searchSession.lastname,
          email: searchSession.email,
        },
        this.secret,
        { expiresIn: "24h" }
      );

      res.json({ token: this.token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  }

  public async removeUser(req: Request, res: Response) {
    await prisma.user.delete({ where: { id: req.body.id } });
  }

  public async myChats(req: Request, res: Response) {
    const userId = req.body.userId;

    const find = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: { chats: true },
    });

    res.json({ response: find });
  }

  public async users(req: Request, res: Response) {
    const user = await prisma.user.findMany();
    res.json(user);
  }
}
