import { Demo, Vote } from '@prisma/client'
import db from '../prismaClientFactory.js'
import logger from '../../utils/logger.js'
import { StatusMessage } from '../../types/StatusMessage.js'

const log = logger('Demo Interface')

export default class DemoInterface {
  // create
  async storeNewDemo(demo: Demo) {
    log.debug(`Storing new demo [${JSON.stringify(demo, null, 2)}]`)
    const demoRecord = await db.demo.create({ data: demo })
    return demoRecord
  }
  // read
  async getAllDemos() {

    log.debug(`Retrieving all demos`)
    return db.demo.findMany()
  }

  async getDemoById(id: number) {
    log.debug(`Retrieving demo by id [${id}]`)
    const demoRecord = await db.demo.findFirst({ where: { id } })
    return demoRecord
  }

  // update
  async updateDemoById(updatedDemo: Demo) {
    log.debug(`Updating demo with id [${updatedDemo.id}]`)
    const updatedDemoRecord = await db.demo.update({ where: { id: updatedDemo.id }, data: updatedDemo })
    return updatedDemoRecord
  }

  async addVote(demoId: number, adminName: string, adminId: number, vote: Vote) {

    return 'not-implemented'

    // log.info(`Admin [${adminName}] voted [${vote}] on demoId [${demoId}]`)
    // const demoRecord = await db.demo.findFirst({ where: { id: demoId } })
    // if (!demoRecord) {
    //   throw new Error(`Demo with id [${demoId}] not found`)
    // }

    // const storedVotes = demoRecord.votes
    // log.debug(`Previous StoredVotes on demoId [${demoId}] --> [${JSON.stringify(storedVotes, null, 2)}]`)
    // storedVotes[adminName] = vote
    // log.debug(`Saving StoredVotes on demoId [${demoId}] --> [${JSON.stringify(storedVotes, null, 2)}]`)

    // await db.demo.update({ where: { id: demoId }, data: storedVotes })

    return { status: StatusMessage.UPDATED }
  }

  // delete
  async deleteDemoById(id: number) {
    log.info(`Deleting demo with id [${id}]`)
    await db.demo.delete({ where: { id } })
  }
}