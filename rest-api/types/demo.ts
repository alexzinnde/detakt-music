import { DemoStatus } from '@prisma/client'

export type DemoSubmitArgs = {
  name: string
  artistAlias: string
  email: string
  demoLink: string
  message: string
}

export type UpdateDemoArgs = {
  name?: string
  email?: string
  demoLink?: string
  message?: string
  status?: DemoStatus
}
