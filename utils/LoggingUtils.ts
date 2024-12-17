import { createLogger, transports, format } from 'winston'
import {resolve, join} from 'path'
import moment = require('moment-timezone')

const currDir = __dirname

const srcDir = resolve(currDir, "..")

const loggingDir = resolve(srcDir, "logging")

const customFormat = format.printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`
})

const timeZone= "Asia/Kolkata"

const Logger = createLogger({
    format: format.combine(
    format.timestamp({ format: ()=> moment().tz(timeZone).format()}), 
    customFormat),

    transports: [
        new transports.Console({ level : "debug"}),
        new transports.File({
            filename: join(loggingDir, "test_run.log"),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "info",
        }),
        new transports.File({
            filename: join(loggingDir, "test_run.log"),
            maxFiles: 5,
            maxsize: 10*1024,
            level: "error",
        }),
    ],
});

export default Logger