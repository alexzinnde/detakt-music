import { RequestHandler } from "express";
import { handleError } from "../services/errorHandling";
import { Demo as demo } from "../db";

export const handleDemoSubmit: RequestHandler = async function (req, res) {
  const demoData = req.body
  if (!demoData) return res.sendStatus(400)
  try {
    await demo.submitDemo(demoData)
    return res.sendStatus(201)
  } catch (err) {
    return handleError('handleDemoSubmit', err, res)
  }
}

export const handleGetAllDemos: RequestHandler = async function (req, res) {
  try {
    const demos = await demo.getAllDemos('createdAt')
    return res.send(demos)
  } catch (err) {
    return handleError('handleGetAllDemos', err, res)
  }
}

export const handleGetDemoById: RequestHandler = async function (req, res) {
  const demoId = parseInt(req.params.id)
  if (!demoId) return res.sendStatus(400)
  try {
    const demoRecord = await demo.getDemoById(demoId)
    if (demoRecord) {
      return res.send(demoRecord)
    }
    return res.status(400).send({ status: 'not-found' })
  } catch (err) {
    return handleError('handleGetDemoById', err, res)
  }
}

export const handleUpdateDemo: RequestHandler = async function (req, res) {
  const demoId = parseInt(req.params.id)
  const updateData = req.body
  if (!demoId || !updateData) return res.sendStatus(400)
  try {
    const demoRecord = await demo.getDemoById(demoId)
    if (!demoRecord) {
      throw new Error(`in handleUpdateDemo: no demo found with id ${demoId}`)
    }

    const udpatedDemo = await demo.updateDemoById(demoId, updateData)
    if (udpatedDemo) {
      return res.send(udpatedDemo)
    }

    throw new Error(`Something went wrong updating demo with id: ${demoId}`)
  } catch (err) {
    return handleError('handleUpdateDemo', err, res)
  }
}

export const handleDeleteDemo: RequestHandler = async function (req, res) {
  const demoId = parseInt(req.params.id)
  if (!demoId) return res.sendStatus(400)
  try {
    const deletedDemo = await demo.deleteDemoById(demoId)
    if (!deletedDemo) throw Error(`Attempted to delete non-existent demo with id: ${demoId}`)
    return res.send({ status: 'ok' })
  } catch (err) {
    return handleError('handleDeleteDemo', err, res)
  }
}