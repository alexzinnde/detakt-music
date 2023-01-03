import { Request, Response } from "express";
import DemoInterface from "../../db/interfaces/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";


const log = logger(`Demo Handler`)
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {
  const { demoId } = req.params
  try {
    const demo = await demoInterface.getDemoById(parseInt(demoId))
    return res.send({ demo })
  } catch (error) {
    log.error(`Error retrieving demo id[${demoId}] [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}