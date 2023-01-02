import db, { exclude } from "../../utils/index.js";
import logger from '../../utils/logger.js'
import { UserRecord, SanitizedUserRecord } from "../../types/User.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import { UserRole } from "@prisma/client";

const log = logger('User')
log.info('Initiating User interface')

export default class User {

  async createUser(newUserData: UserRecord): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`createing new user\nnewUserData ${newUserData}`)
    const newUser = await db.user.create({ data: { ...newUserData } })
    return exclude(newUser, ['password']) as SanitizedUserRecord
  }

  async getUserById(id: number): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`Getting user with id [${id}]`)
    const user = await db.user.findFirst({ where: { id } })
    if (user) {
      return exclude(user, ['password']) as SanitizedUserRecord
    }
    log.warn(`User with id [${id}] not found`)
    return StatusMessage.NOT_FOUND
  }

  async getUserByUsername(username: string): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`Getting user with username [${username}]`)
    const user = await db.user.findFirst({ where: { username } })
    if (user) {
      return exclude(user, ['password']) as SanitizedUserRecord
    }
    log.warn(`User with username [${username}] not found`)
    return StatusMessage.NOT_FOUND
  }

  async getAllUsersByType(type: UserRole): Promise<SanitizedUserRecord[] | StatusMessage> {
    log.debug(`Getting all users of type [${type}]`)
    const users = await db.user.findMany({ where: { type } })
    return exclude(users, ['password']) as SanitizedUserRecord[]
  }

  async getUserByEmail(email: string): Promise<SanitizedUserRecord | StatusMessage> {
    const user = await db.user.findFirst({ where: { email } })
    return user
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateUser(updatedUser: any): Promise<SanitizedUserRecord | StatusMessage> {
    await db.user.update({ where: { id: updatedUser.id }, data: updatedUser })
    return StatusMessage.UPDATED
  }

  async deleteUserById(id: number): Promise<SanitizedUserRecord | StatusMessage> {
    await db.user.delete({ where: { id } })
    return StatusMessage.DELETED
  }

}