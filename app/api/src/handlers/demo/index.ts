import DemoInterface from "../../db/interfaces/Demo.js";
import Email from "../../interfaces/Email.js";
import logger from "../../utils/logger.js";
import { Logger } from "winston";
import { Request, Response } from "express";
import { StatusMessage } from "../../types/StatusMessage.js";
import { DemoStatus } from "@prisma/client";

export default class DemoRouteHandler {
  private _log: Logger
  private _demo: DemoInterface
  private _email: typeof Email

  constructor() {
    this._log = logger(`DemoRouteHandler`)
    this._demo = new DemoInterface()
    this._email = Email

    Object.getOwnPropertyNames(DemoRouteHandler.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .forEach((method) => (this[method] = this[method].bind(this)))
  }

  async handleNewDemoSubmission(req: Request, res: Response) {
    // Store submitted Data
    // TODO: Verify submitted data
    const submittedDemoData = req.body

    if (!submittedDemoData) {
      return res.status(400).send({ status: StatusMessage.INVALID_INPUT, })
    }

    const demoData = { ...submittedDemoData, status: DemoStatus.RECEIVED, votes: {} }
    try {
      const demo = await this._demo.storeNewDemo(demoData)
      // email admins
      await this._email.sendNewDemoEmailToAdmins(demo)
      // email submitting artist
      return res.status(201).send({ demo })
    } catch (error) {
      this._log.error(`Error storing new demo [${JSON.stringify(demoData, null, 2)}] [${error.message}]`)
      return res.status(500).send({ error: StatusMessage.ERROR })
    }
  }

  async getAllDemos(req: Request, res: Response) {
    try {
      const demos = await this._demo.getAllDemos()
      return res.send({ demos })
    } catch (error) {
      this._log.error(`Error retrieving all demo [${error.message}]`)
      return res.status(500).send({ error: StatusMessage.ERROR })
    }
  }

  async getDemoById(req: Request, res: Response) {
    const { demoId } = req.params
    try {
      const demo = await this._demo.getDemoById(parseInt(demoId))
      if (demo) {
        return res.send({ demo })
      }

      return res.status(404).send({ status: StatusMessage.NOT_FOUND })
    } catch (error) {
      this._log.error(`Error retrieving demo id[${demoId}] [${error.message}]`)
      return res.status(500).send({ error: StatusMessage.ERROR })
    }
  }

  async deleteDemoById(req: Request, res: Response) {
    const { demoId } = req.params
    try {
      const demoIdInt = parseInt(demoId)
      await this._demo.deleteDemoById(demoIdInt)

      return res.status(204).send({ status: StatusMessage.DELETED })
    } catch (error) {
      this._log.error(`Error deleting demo id[${demoId}] [${error.message}]`)
      return res.status(500).send({ error: StatusMessage.ERROR })
    }
  }
}

// export {
//   updateDemoRecord,
//   handleDemoVote
// }