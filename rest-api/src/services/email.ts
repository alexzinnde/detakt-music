import { Demo } from "@prisma/client";

import { SendGridEmailMessageProps, SendGridSendEmailCallback } from "../../types/email";
// import { sendEmail } from "./external/sendgrid";

import sgMail, { ClientResponse, MailDataRequired, ResponseError } from '@sendgrid/mail'

export async function setupNoticeNewDemoEmail(demo: Demo, cb: SendGridSendEmailCallback) {
  // TODO:: don't hardcode emails
  const msg: SendGridEmailMessageProps = {
    from: 'alexzinnde@gmail.com',
    to: 'zinntechniker@gmail.com',
    subject: 'New Detakt Demo',
    html: `<html>
        <head></head>
        <body>
          <h1>New Detakt Demo Submitted</h1>

          <div id="demo-details">
            <ul> 
              <li>
                Name: ${demo.name}
              </li>
              <li>
                  Artist Alias: ${demo.artistAlias}
              </li>
              <li>
                Email: ${demo.email}
              </li>
              <li>
                Link: <a href="${demo.demoLink}">${demo.demoLink}</a>
              </li>
              <li>
                Message: ${demo.message}
              </li>
            </ul>
          </div>
        <body>
      </html>`
  }
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('Env var missing email services')
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  sgMail.send(msg)
    .then((value) => {
      console.log(`Sent Email of type [DEMO_NOTIFICATION] to [${msg.to}] for demo id: [${demo.id}]
      ${value}
    `)
      cb(null, value[0])})
    .catch((error) => cb(error, null))
}