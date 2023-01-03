import sgMail from '@sendgrid/mail'
import logger from './logger.js'

const log = logger('SendGrid')

const { SENDGRID_API_KEY } = process.env
if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY missing from env")
}

sgMail.setApiKey(SENDGRID_API_KEY)

export default function (recipients: string[], subject: string, message: string) {
  const msg = {
    to: recipients,
    from: 'alexzinnde@gmail.com',
    subject: subject,
    text: message,
    html: message
  };
  const isMultiple = recipients.length > 1
  sgMail
    .send(msg, isMultiple)
    .then(() => {
      log.info(`[${new Date().toISOString()}] Email sent to [${recipients}]`)
    }, error => {
      log.error(error);

      if (error.response) {
        log.error(error.response.body)
      }
    });
}

