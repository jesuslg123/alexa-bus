'use strict'

const BYE_MESSAGE = 'Hasta pronto';

const ExitHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(BYE_MESSAGE)
        .withShouldEndSession(true)
        .getResponse();
    },
  };

  module.exports = ExitHandler;
