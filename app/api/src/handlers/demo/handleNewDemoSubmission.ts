import { Request, Response } from "express";
import DemoInterface from "../../db/interfaces/Demo.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import logger from "../../utils/logger.js";
import { DemoStatus } from '@prisma/client'
import email from "../../interfaces/Email.js";


const log = logger(`Demo Handler`)
const demoInterface = new DemoInterface()

export default async function (req: Request, res: Response) {

  // Store submitted Data
  // TODO: Verify submitted data
  const submittedDemoData = req.body

  if (!submittedDemoData) {
    return res.status(400).send({ status: StatusMessage.INVALID_INPUT, })
  }

  const demoData = { ...submittedDemoData, status: DemoStatus.RECEIVED, votes: {} }
  try {
    const demo = await demoInterface.storeNewDemo(demoData)
    // email admins
    await email.sendNewDemoEmailToAdmins(demo)
    // email submitting artist
    return res.status(201).send({ demo })
  } catch (error) {
    log.error(`Error storing new demo [${JSON.stringify(demoData, null, 2)}] [${error.message}]`)
    return res.status(500).send({ error: StatusMessage.ERROR })
  }
}