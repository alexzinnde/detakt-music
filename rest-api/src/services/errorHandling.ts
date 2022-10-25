import { Response } from "express";

export function handleError(where: string, error: any, res?: Response) {
  console.error('ERROR:: in %s\n', where, error)

  if (res) {
    res.sendStatus(500)
  }
}