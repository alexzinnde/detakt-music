import { ClientResponse, ResponseError } from "@sendgrid/mail"

export enum EmailType {
  NEW_DEMO,
}

export type SendGridEmailMessageProps = {
  to: string
  from: string
  subject: string
  html: string
  text?: string
}


export type SendGridSendEmailCallback = (err: ResponseError | null, response: ClientResponse | null) => void