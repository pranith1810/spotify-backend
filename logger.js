const { createLogger, transports, format } = require('winston');


const myFormat = format.combine(
    format.timestamp(),
    format.simple()
    )


const infoTransport = new transports.File({
    filename: 'logger/info.log',
    level: 'info',
    format: myFormat
})

const errorTransport = new transports.File({
    filename: 'logger/info.error',
    level: 'error',
    format: myFormat
})

const consoleInfoTransport = new transports.Console({
    level: 'info',
    format: myFormat
})


const logger = createLogger({
    transports: [infoTransport , errorTransport, consoleInfoTransport]
})


module.exports = logger;
