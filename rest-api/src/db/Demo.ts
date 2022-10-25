import { DemoStatus, PrismaClient, Demo } from '@prisma/client'
import { DemoSubmitArgs, UpdateDemoArgs } from "../../types/demo"

class DemoInterface {
  private _db: PrismaClient
  constructor() {
    this._db = new PrismaClient()
  }

  // create
  async submitDemo(demo: DemoSubmitArgs): Promise<Demo> {
    return this._db.demo.create({ data: demo })
  }

  // read
  async getDemoById(id: number): Promise<Demo | null> {
    return this._db.demo.findFirst({ where: { id: id } })
  }

  async getDemoByArtistAilias(artistAlias: string, orderBy?: any): Promise<Demo[]> {
    return this._db.demo.findMany({ where: { artistAlias }, orderBy })
  }

  async getDemosByStatus(status: DemoStatus, orderBy: any): Promise<Demo[]> {
    return this._db.demo.findMany({ where: { status: status || 'SUBMITTED' }, orderBy })
  }

  async getAllDemos(orderBy?: any): Promise<Demo[]> {
    return this._db.demo.findMany({})
  }

  // update
  async updateDemoById(id: number, updateData: UpdateDemoArgs): Promise<Demo | null> {
    return this._db.demo.update({ where: { id }, data: { ...updateData } })
  }

  // delete
  async deleteDemoById(id: number) {
    return this._db.demo.delete({ where: { id } })
  }

}

export default new DemoInterface()