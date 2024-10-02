import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class GroupController {
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      await prisma.chatGroup.create({
        data: {
          title: body?.title,
          passcode: body?.passcode,
          user_id: user.id,
        },
      });

      return res
        .status(201)
        .json({ status: true, message: "Ghat Group Created Successfully" });
    } catch (error) {
      console.log("Error in GroupController : ", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal Server error..." });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.status(200).json({ status: true, message: "Groups fetched successfully", data: groups });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: false,
          message: "Something went wrong.please try again!",
        });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        return res.status(200).json({ status: true,  data: group });
      }

      return res.status(404).json({ status: false, message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Something went wrong.please try again!" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      if (id) {
        await prisma.chatGroup.update({
          data: body,
          where: {
            id: id,
          },
        });
        return res.json({ message: "Group updated successfully!" });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      return res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default GroupController;
