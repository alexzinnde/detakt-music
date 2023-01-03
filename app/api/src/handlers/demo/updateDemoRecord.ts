import { Request, Response } from "express";
import DemoInterface from "../../db/interface/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";

const log = logger('Demo Handler')
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {
  const { updatedDemo } = req.body
  try {
    const updateDemoRecord = await demoInterface.updateDemoById(updatedDemo)
    return res.status(201).send({ demo: updateDemoRecord })
  } catch (error) {
    log.error(`Error updating demo id [${updatedDemo.id}] [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}