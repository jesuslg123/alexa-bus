'use strict'

const favorites = require('../libs/database/favorites.js')
const selectedCity = process.env.CITY;
let cityLib;


switch (selectedCity) {
    case 'BARNA':
        cityLib = require('./../libs/Barcelona/Barcelona.js')
    break;
    case 'GRANA':
        cityLib = require('./../libs/Granada/Granada.js')
    break;
}

const STOP_NOT_FOUND_MESSAGE = 'No he encontrada información para la parada';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';

const StopByNameHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'StopByNameIntent';
    },
    async handle(handlerInput) {
        console.log(handlerInput.requestEnvelope.request.intent);
        let stopName = handlerInput.requestEnvelope.request.intent.slots.stopName.value || '';

        let stopId = await favorites.get(handlerInput, stopName)
        
        if (!stopId) {
            console.log(`${stopName} conversion favorites`, stopId)

            return handlerInput.responseBuilder
                .speak(`${STOP_NOT_FOUND_MESSAGE} ${stopName}. ${HELP_REPROMPT}`)
                .reprompt(HELP_REPROMPT)
                .withShouldEndSession(false)
                .getResponse();
        }

        let data = await cityLib.getTimes(stopId)
        .catch(error => {
            console.error(error)
            return;
        });

        if (data) {
        console.log('OK', data)

        return handlerInput.responseBuilder
            .speak(`${data.speech}. ${HELP_REPROMPT}`)
            .reprompt(HELP_REPROMPT)
            .withSimpleCard(data.card.title, data.card.info)
            .withShouldEndSession(false)
            .getResponse();
        } else {
        console.log('Error');
        const speechOutput = `${STOP_NOT_FOUND_MESSAGE} ${stopId}`;

        return handlerInput.responseBuilder
            .speak(`${speechOutput}. ${HELP_REPROMPT}`)
            .reprompt(HELP_REPROMPT)
            .withShouldEndSession(false)
            .getResponse();
        }

      
    },
  };
  
module.exports = StopByNameHandler;