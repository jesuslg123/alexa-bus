
const WELCOME_MESSAGE = '¡Bienvenido!';
const HELP_MESSAGE = 'Puedes pedirme tiempos para una parada, guardar paradas favoritas o, puedes decir para... ¿Cómo te puedo ayudar?';

const LaunchHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speechOutput = `${WELCOME_MESSAGE}. ${HELP_MESSAGE}`;
  
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(HELP_MESSAGE)
        .getResponse();
    },
  };

module.exports = LaunchHandler;