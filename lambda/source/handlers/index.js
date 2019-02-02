'use strict'

module.exports = {
    LaunchHandler: require('./LaunchHandler.js'),
    HelpHandler: require('./HelpHandler.js'),
    ExitHandler: require('./ExitHandler.js'),
    SessionEndedHandler: require('./SessionEndedHandler'),
    ErrorHandler: require('./ErrorHandler.js'),
    StopByNumberHandler: require('./StopByNumberHandler.js'),
    StopByNameHandler: require('./StopByNameHandler.js'),
    AddFavoriteHandler: require('./favorites/AddFavoriteHandler.js'),
    DeleteFavoriteHandler: require('./favorites/DeleteFavoriteHandler.js'),
    ListFavoriteHandler: require('./favorites/ListFavoriteHandler.js')
}