import server from './src/server.js'
import createLogger from './src/utils/logger.js'

const PORT = process.env.PORT || 4444

const log = createLogger('index')

server.listen(PORT, () => log.info(`Server listening on port [${PORT}]`))