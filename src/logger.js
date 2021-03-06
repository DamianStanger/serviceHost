/* eslint-disable no-process-env */
const pino = require("pino");


function logger(name, instanceLevel) {

  const level = instanceLevel || process.env.serviceHostLoggerLevel || "silent";
  const pinoLogger = pino({name, level});

  return {
    "fatal": (...args) => {
      pinoLogger.fatal(...args);
    },
    "error": (...args) => {
      pinoLogger.error(...args);
    },
    "warn": (...args) => {
      pinoLogger.warn(...args);
    },
    "info": (...args) => {
      pinoLogger.info(...args);
    },
    "debug": (...args) => {
      pinoLogger.debug(...args);
    },
    "trace": (...args) => {
      pinoLogger.trace(...args);
    }
  };
}


module.exports = logger;
