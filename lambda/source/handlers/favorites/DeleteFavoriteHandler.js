'use strict'

const favorites = require('../../libs/database/favorites.js')

const DELETE_CONFIRMATION = 'Favorito eliminado';
const MORE_ACTION = '¿Qué quieres hacer ahora?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';

const DeleteFavoriteHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DeleteFavoriteIntent';
    },
    async handle(handlerInput) {
        console.log(handlerInput.requestEnvelope.request.intent);
      
        const slots = handlerInput.requestEnvelope.request.intent.slots
        const stopName = slots.stopName.value

        await favorites.delete(handlerInput, stopName)
  
        return handlerInput.responseBuilder
            .speak(`${DELETE_CONFIRMATION}. ${MORE_ACTION}`)
            .reprompt(HELP_REPROMPT)
            .withShouldEndSession(false)
            .getResponse();

    }
  };
  
module.exports = DeleteFavoriteHandler;