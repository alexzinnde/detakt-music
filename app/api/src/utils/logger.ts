import path from 'path'
import winston from 'winston'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const defaultLogPath = path.resolve(__dirname, '..', '..', 'logs')

export default function (service: string) {
  const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info': 'debug',
    format: winston.format.json(),
    defaultMeta: {service},
    transports: [
      new winston.transports.File({ dirname: defaultLogPath, filename: 'error.log', level: 'error' }),
      new winston.transports.File({ dirname: defaultLogPath, filename: 'combined.log' }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger
}