import { Request, Response } from "express";
import DemoInterface from "../../db/interface/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";
import { DemoStatus } from '@prisma/client'


const log = logger(`Demo Handler`)
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {
  const submittedDemoData = req.body

  if (!submittedDemoData) {
    return res.status(400).send({ status: StatusMessage.INVALID_INPUT, })
  }

  const demoData = { ...submittedDemoData, status: DemoStatus.RECEIVED, votes: {} }
  try {
    const demo = await demoInterface.storeNewDemo(demoData)
    return res.status(201).send({ demo })
  } catch (error) {
    log.error(`Error storing new demo [${JSON.stringify(demoData, null, 2)}] [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}