console.log("Starting app, v0.1.0")

const Alexa = require('ask-sdk');
const Handlers = require('./handlers/index.js')
const favorites = require('./libs/database/favorites.js')

const skillBuilder = Alexa.SkillBuilders.standard();

console.log(Handlers)

exports.handler = skillBuilder
  .addRequestHandlers(
    //CUSTOM HANDLERS
    Handlers.StopByNumberHandler,
    Handlers.StopByNameHandler,
    Handlers.AddFavoriteHandler,
    Handlers.DeleteFavoriteHandler,
    Handlers.ListFavoriteHandler,
    //DEFAULT AMAZON HANDLERS
    Handlers.LaunchHandler,
    Handlers.HelpHandler,
    Handlers.ExitHandler,
    Handlers.SessionEndedHandler
  )
  .withAutoCreateTable(true)
  .withTableName(favorites.tableName)
  .addErrorHandlers(Handlers.ErrorHandler)
  .lambda();