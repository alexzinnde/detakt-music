import { PrismaClient } from "@prisma/client";

let db = null

export default (function () {
  if (db === null) {
    db = new PrismaClient()
  }
  return db
})()