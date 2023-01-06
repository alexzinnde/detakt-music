import { Logger } from 'winston'
import UserModel from '../../db/models/User.js'
import Email from '../../interfaces/Email.js'
import logger from '../../utils/logger.js'

import { Request, Response } from 'express'
import { StatusMessage } from '../../types/StatusMessage.js'
import User from '../../db/models/User.js'
import { Prisma, UserRole } from '@prisma/client'

export default class UserRouteHandler {
  private _log: Logger
  private _user: UserModel
  private _email: typeof Email
  constructor() {
    this._log = logger(`UserRouteHandler`)
    this._user = new UserModel()
    this._email = Email

    Object.getOwnPropertyNames(UserRouteHandler.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .forEach((method) => (this[method] = this[method].bind(this)))
  }


  async createUserProfile(req: Request, res: Response) {
    const { newUserData } = req.body
    if (!newUserData) return res.status(400).send({ status: StatusMessage.INVALID_INPUT })
    try {
      const user = new User()
      const exisitingUserWithEmail = await user.getUserByEmail(newUserData.email)
      const existingUserWithUsername = await user.getUserByUsername(newUserData.username)

      if (exisitingUserWithEmail) {
        throw new Error(`User already exists with email [${newUserData.email}] `)
      }

      if (existingUserWithUsername) {
        throw new Error(`User already exists with username [${newUserData.username}] `)
      }

      const newUser = await user.createUser(newUserData)

      return res.status(201).send({ status: StatusMessage.OK, user: newUser })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this._log.error(`Unable to complete createUserProfile request. Error: [${JSON.stringify(error, null, 2)}]`)

        return res.status(500).send({ status: StatusMessage.ERROR, error })
      }

      if (error.message.includes('User already exists')) {
        return res.status(400).send({ status: StatusMessage.INVALID_INPUT, error: error.message })
      }

      return res.status(500).send({ status: StatusMessage.ERROR, error: error.message, })
    }
  }

  async getUserProfile(req: Request, res: Response) {
    const { userId, userRole } = req.params

    try {
      const user = new User()

      if (userId) {
        const userRecord = await user.getUserById(parseInt(userId))
        return res.send({ status: StatusMessage.OK, user: userRecord })
      }

      if (userRole) {
        const users = await user.getAllUsersByType(userRole as UserRole)
        return res.send({ status: StatusMessage.OK, users })
      }

      return res.status(400).send({ status: StatusMessage.INVALID_INPUT })
    } catch (error) {
      this._log.error(`Error completing getUserProfile request`, error)
      return res.status(500).send({ status: StatusMessage.ERROR })
    }
  }
}
