'use strict'

const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const HELP_MESSAGE = 'Puedes pedirme tiempos para una parada, guardar paradas favoritas o, puedes decir para... ¿Cómo te puedo ayudar?';

const HelpHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(HELP_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .withShouldEndSession(false)
        .getResponse();
    },
  };

  module.exports = HelpHandler;