import db from '../db/prismaClientFactory.js'

export function exclude<T, Key extends keyof T>(
  item: T | T[],
  keys: Key[]
): Omit<T, Key> | Omit<T, Key>[] {
  if (Array.isArray(item)) {
    return item.map<T>((record) => deleteKey(record, keys))
  }
  return deleteKey(item, keys)
}


function deleteKey<T, Key extends keyof T>(item: T, keys: Key[]) {
  for (const key of keys) {
    delete item[key]
  }
  return item
}
export default db