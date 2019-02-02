'use strict'

const ERROR_MESSAGE = 'Perdona, ha ocurrido un error.';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';

const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak(ERROR_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .withShouldEndSession(false)
        .getResponse();
    },
  };

  module.exports = ErrorHandler;