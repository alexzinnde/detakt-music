import { RequestHandler } from "express";
import { handleError } from "../services/errorHandling";
import { Demo } from "../db";
import { setupNoticeNewDemoEmail } from '../services/email'

export const handleDemoSubmit: RequestHandler = async function (req, res) {
  const demoData = req.body
  if (!demoData) return res.sendStatus(400)
  try {
    const demo = await Demo.submitDemo(demoData)
    setupNoticeNewDemoEmail(demo, function (err, response) {
      if (err) {
        return handleError('ERROR:: in SendGrid Send Email\n', err)
      }
      console.log('response: ', response)
    })
    return res.sendStatus(201)
  } catch (err) {
    return handleError('handleDemoSubmit', err, res)
  }
}

export const handleGetAllDemos: RequestHandler = async function (req, res) {
  try {
    const demos = await Demo.getAllDemos('createdAt')
    return res.send(demos)
  } catch (err) {
    return handleError('handleGetAllDemos', err, res)
  }
}

export const handleGetDemoById: RequestHandler = async function (req, res) {
  const demoId = parseInt(req.params.id)
  if (!demoId) return res.sendStatus(400)
  try {
    const demo = await Demo.getDemoById(demoId)
    if (demo) {
      return res.send(demo)
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
    const demoRecord = await Demo.getDemoById(demoId)
    if (!demoRecord) {
      throw new Error(`in handleUpdateDemo: no demo found with id ${demoId}`)
    }

    const udpatedDemo = await Demo.updateDemoById(demoId, updateData)
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
    const deletedDemo = await Demo.deleteDemoById(demoId)
    if (!deletedDemo) throw Error(`Attempted to delete non-existent demo with id: ${demoId}`)
    return res.send({ status: 'ok' })
  } catch (err) {
    return handleError('handleDeleteDemo', err, res)
  }
}