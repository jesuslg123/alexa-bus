'use strict'

const favorites = require('../../libs/database/favorites.js')

const FAVORITES_NOT_FOUND_MESSAGE = `No tienes ningún favorito guardado. Puedes decir, guardar parada, el número, con nombre, y el nombre que quieras usar.`
const FAVORITES_TITLE = 'Favoritos guardados'
const FAVORITES_CHOOSE_ONE_MESSAGE = '¿Cual quieres consultar? Dí "parada" y el nombre'
const HELP_REPROMPT = '¿Cómo te puedo ayudar?'

const FAVORITES_TITLE_SPEECH = 'Tus favoritos son'

const ListFavoriteHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'ListFavoriteIntent';
    },
    async handle(handlerInput) {
        console.log(handlerInput.requestEnvelope.request.intent)
      
        const userFavorites = await favorites.getAll(handlerInput)
  
        if (Object.keys(userFavorites).length == 0) {
            return handlerInput.responseBuilder
            .speak(`${FAVORITES_NOT_FOUND_MESSAGE}. ${HELP_REPROMPT}`)
            .reprompt(HELP_REPROMPT)
            .withShouldEndSession(false)
            .getResponse();
        } else {
            const data = _favoritesToCard(userFavorites)
            return handlerInput.responseBuilder
                .speak(`${data.speech}.`)
                .reprompt(HELP_REPROMPT)
                .withSimpleCard(data.card.title, data.card.info)
                .withShouldEndSession(false)
                .getResponse();
        }

    }
};

function _favoritesToCard(favorites) {
    let data = {}

    let speechFavorites = Object.keys(favorites).join(', ')
    let cardFavorites = ""
    Object.keys(favorites).forEach(function(key) {
        const favorite = favorites[key]
        cardFavorites += `\n${key} (${favorite})`
    })

    data.speech = `${FAVORITES_TITLE_SPEECH}: ${speechFavorites}. ${FAVORITES_CHOOSE_ONE_MESSAGE}.`

    data.card = {}
    data.card.title = FAVORITES_TITLE
    data.card.info = cardFavorites

    return data
}
  
module.exports = ListFavoriteHandler;