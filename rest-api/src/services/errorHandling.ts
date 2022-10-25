import { Response } from "express";

export function handleError(where: string, error: any, res?: Response) {
  console.error('ERROR:: in %s', where, error)
  if (res) {
    res.sendStatus(500)
  }
}