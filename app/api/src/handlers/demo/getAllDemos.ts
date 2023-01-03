import { Request, Response } from "express";
import DemoInterface from "../../db/interfaces/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";


const log = logger(`Demo Handler`)
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {
  try {
    const demos = await demoInterface.getAllDemos()
    return res.send({ demos })
  } catch (error) {
    log.error(`Error retrieving all demo [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}