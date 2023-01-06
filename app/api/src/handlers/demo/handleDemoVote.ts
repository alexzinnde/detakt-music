import { Vote } from "@prisma/client";
import { Request, Response } from "express";
import DemoInterface from "../../db/models/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";

const log = logger('Demo Handler')
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {
  const { adminName, adminId, vote, demoId }: { adminName: string, adminId: number, vote: Vote, demoId: number } = req.body
  try {
    await demoInterface.addVote(demoId, adminName, adminId, vote,)
    return res.status(201)
  } catch (error) {
    log.error(`Error voting on  demo id [${demoId}] [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}