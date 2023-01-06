import db, { exclude } from "../../utils/index.js";
import logger from '../../utils/logger.js'
import { UserRecord, SanitizedUserRecord } from "../../types/User.js";
import { StatusMessage } from "../../types/StatusMessage.js";
import { UserRole } from "@prisma/client";

const log = logger('User')
log.info('Initiating User interface')

export default class UserInterface {

  async createUser(newUserData: UserRecord): Promise<SanitizedUserRecord | StatusMessage> {
    // TODO: Verify newUserData before creating new user
    
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

  async getAllUsersByType(type: UserRole): Promise<SanitizedUserRecord[] | StatusMessage> {
    log.debug(`Getting all users of type [${type}]`)
    const users = await db.user.findMany({ where: { type } })
    return users.length ? exclude(users, ['password']) as SanitizedUserRecord[] : []
  }

  async getUserByUsername(username: string): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`Getting user with username [${username}]`)
    const user = await db.user.findFirst({ where: { username } })
    return user !== null ? exclude(user, ['password']) as SanitizedUserRecord : null
  }

  async getUserByEmail(email: string): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`Getting user with email[${email}]`)
    const user = await db.user.findFirst({ where: { email } })
    return user !== null ? exclude(user, ['password']) as SanitizedUserRecord : null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateUser(updatedUserData: any): Promise<SanitizedUserRecord | StatusMessage> {
    log.debug(`Updating user with id [${updatedUserData.id}]`)
    await db.user.update({ where: { id: updatedUserData.id }, data: updatedUserData })
    return StatusMessage.UPDATED
  }

  async deleteUserById(id: number): Promise<SanitizedUserRecord | StatusMessage> {
    log.info(`Deleting user with id [${id}]`)
    await db.user.delete({ where: { id } })
    return StatusMessage.DELETED
  }

}