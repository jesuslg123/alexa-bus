'use strict'

const favorites = require('../../libs/database/favorites.js')

const ADD_CONFIRMATION = 'Favorito guardado';
const MORE_ACTION = '¿Qué quieres hacer ahora?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';

const AddFavoriteHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AddFavoriteIntent';
    },
    async handle(handlerInput) {
        console.log(handlerInput.requestEnvelope.request.intent);

        const slots = handlerInput.requestEnvelope.request.intent.slots
        const stopNumber = slots.stopNumber.value
        const stopName = slots.stopName.value

        if (!stopNumber) {
            const request = handlerInput.requestEnvelope.request;
            const responseBuilder = handlerInput.responseBuilder;
            const intent = request.intent;
      
            return responseBuilder
                .addDelegateDirective(intent)
                .getResponse();
        }


        await favorites.add(handlerInput, stopName, stopNumber)
  
        return handlerInput.responseBuilder
            .speak(`${ADD_CONFIRMATION}. ${MORE_ACTION}`)
            .reprompt(HELP_REPROMPT)
            //.withSimpleCard(data.card.title, data.card.info) //TODO: Show all favorites
            .withShouldEndSession(false)
            .getResponse();

    }
  };
  
module.exports = AddFavoriteHandler;