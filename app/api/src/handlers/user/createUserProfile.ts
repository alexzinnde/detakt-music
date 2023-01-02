import { Prisma } from '@prisma/client';
import { Request, Response } from 'express'
import User from "../../db/interface/User.js";
import { StatusMessage } from "../../types/StatusMessage.js";

import logger from '../../utils/logger.js'
const log = logger('User Controller')

export default async function createUserProfile(req: Request, res: Response) {
  const {newUserData} = req.body
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
      log.error(`Unable to complete createUserProfile request. Error: [${JSON.stringify(error, null, 2)}]`)

      return res.status(500).send({ status: StatusMessage.ERROR, error })
    }

    if (error.message.includes('User already exists')) {
      return res.status(400).send({ status: StatusMessage.INVALID_INPUT, error: error.message })
    }

    return res.status(500).send({ status: StatusMessage.ERROR, error: error.message, })
  }
}