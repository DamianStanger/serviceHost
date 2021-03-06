const logger = require("../src/logger")("example.service");
const wait = require("../src/utils/wait");


function orderPlacedHandler(message, success, retry, fail) {
  logger.info(`${message.correlationId} - orderPlacedHandler processing message`, message);

  // This is where you would do some work with the message then call the relevent
  // callback depending on the outcome of the processing.
  // The following is a fake exmple that will take 2 seconds to process the message
  // and then mark it as success.

  return wait(500).then(() => {
    if (message.payload && message.payload.simulateFailure) {
      logger.error(`${message.correlationId} - Throwing ${message.payload.simulateFailure}`);
      throw new Error(message.payload.simulateFailure);
    }
    logger.warn("Success :-)", message);
    success(message);
  }).catch(err => {
    const someFatalNonRecoverableErrorOccured = err.toString() === "Error: someFatalNonRecoverableErrorOccured";
    if (someFatalNonRecoverableErrorOccured) {
      fail(message, err);
    } else {
      retry(message, err);
    }
  });
}

function registerHandlers(serviceHost) {
  const eventName = "orderPlaced";
  const versionNumber = 1;
  serviceHost.register(orderPlacedHandler, eventName, versionNumber);
}


module.exports = registerHandlers;
