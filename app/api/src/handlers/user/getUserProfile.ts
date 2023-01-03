import { UserRole } from '@prisma/client'
import { Request, Response } from 'express'
import User from '../../db/interfaces/User.js'
import { StatusMessage } from '../../types/StatusMessage.js'
import logger from '../../utils/logger.js'

const log = logger('User Controller')

export default async function getUserProfile(req: Request, res: Response) {
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
    log.error(`Error completing getUserProfile request`, error)
    return res.status(500).send({ status: StatusMessage.ERROR })
  }
}