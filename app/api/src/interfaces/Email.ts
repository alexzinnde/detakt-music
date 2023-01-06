import { Demo, User } from "@prisma/client";
import sendGrid from "../utils/SendGrid.js";
import UserInterface from "../db/models/User.js";
import logger from "../utils/logger.js";

const log = logger('Email Interface')
class Email {

  private _userInterface: UserInterface
  constructor() {
    this._userInterface = new UserInterface()
  }
  async sendNewDemoEmailToAdmins(demo: Demo) {

    const emailEnabled = process.env['EMAIL_ENABLED']
    log.info(`enabled: ${emailEnabled}`)
    if (emailEnabled === 'true') {
      try {
        const admins = await this._userInterface.getAllUsersByType('ADMIN')
        if (Array.isArray(admins)) {
          const adminEmails = admins.map((admin: User) => admin.email)

          const subject = 'New Demo Recieved'
          const message = `<html>New demo recieved on: ${new Date().toISOString()} <br/>
        <strong>Name:</strong> ${demo.name}  <br/>
        <strong>Artist:</strong> ${demo.artistAlias} <br/>
        <strong>Email:</strong> ${demo.email} <br/>
        <strong>Message:</strong> ${demo.message} <br/>
        <strong>Link:</strong> ${demo.link} <br/>
        </html>
      `
          sendGrid(adminEmails, subject, message)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        log.error(`Error in sendNewDEmoEmailToAdmins\n${error.message}`)
      }
    } else {
      log.info('MOCKING EMAIL SENT SUCCESSFULLY')
    }
  }
}

let email: Email = null

export default (function () {
  if (!email) {
    email = new Email()
  }
  return email
})()