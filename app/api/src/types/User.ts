import { User } from '@prisma/client'
import { StatusMessage } from './StatusMessage.js'


export type UserRecord = User
export type SanitizedUserRecord = Omit<User, 'password'>

export enum UserType {
  ADMIN = 'admin',
  ARTIST = 'artist'
}

export type UserReturnObject = { error?: StatusMessage, user?: SanitizedUserRecord | StatusMessage, users?: SanitizedUserRecord[] }

export type NewUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'verifiedAt'>