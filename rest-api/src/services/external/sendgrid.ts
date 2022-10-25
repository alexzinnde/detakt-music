import sgMail, { ClientResponse, MailDataRequired, ResponseError } from '@sendgrid/mail'
import { SendGridSendEmailCallback } from '../../../types/email'






export async function sendEmail(msg: MailDataRequired, cb: SendGridSendEmailCallback) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('Env var missing email services')
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  sgMail.send(msg)
    .then((value) => cb(null, value[0]))
    .catch((error) => cb(error, null))
}