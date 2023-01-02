import db from '../db/prismaClientFactory.js'
import { user as PublicUser } from '@prisma/client'

export function exclude<T, Key extends keyof T>(
  item: T | T[],
  keys: Key[]
): Omit<T, Key> | Omit<T, Key>[] {
  if (Array.isArray(item)) {
    // @ts-ignore
    return item.map<T>((record) => deleteKey(record, keys))
  }
  return deleteKey(item, keys)
}


function deleteKey<T, Key extends keyof T>(item: T, keys: Key[]) {
  for (let key of keys) {
    delete item[key]
  }
  return item
}
export default db