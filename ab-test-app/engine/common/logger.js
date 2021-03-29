'use strict'
const winston = require('winston')
const stringifyObject = require('stringify-object')

const logger = winston.createLogger()

class Logger{ 

    static init(){
      logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }))
    }

    static debug(...messages){
      logger.log({
        level: 'debug',
        message: Logger.format(messages)
        })
    }

    static info(...messages){
      logger.log({
        level: 'info',
        message: Logger.format(messages)
        })
    }

    static warning(...messages){
      logger.log({
        level: 'warn',
        message: Logger.format(messages)
        })
    }

    static error(...messages){
      logger.log({
        level: 'error',
        message: Logger.format(messages)
        })
    }

    static format(messages) {
      var output = stringifyObject(messages, {
        indent: '',
        singleQuotes: false,
        inlineCharacterLimit: 1000,
        transform: (object, property, originalResult) => {
          return originalResult.replace(/^"/g, '').replace(/"$/g, '')
        }
      })
      return output.replace(/^\[/g, '').replace(/\]$/g, '')
    }
}

module.exports = Logger
