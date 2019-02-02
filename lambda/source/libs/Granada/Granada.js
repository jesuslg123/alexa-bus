'use strict'

let GranadaBusAPI = require('./GranadaBusAPI.js')

const GET_STOP_MESSAGE = 'Información de la parada'

class Granada {
    constructor() {
        this.granadaBusAPI = new GranadaBusAPI(process.env.GRANADAAPI, 443)
    }

    getTimes(stopID) {
        return new Promise((resolve, reject) => { 
            this.granadaBusAPI.apiTimes(stopID)
            .then(data => {
                const title = `${GET_STOP_MESSAGE} ${stopID}`
                const message = this.timesMessage(data)

                resolve({
                    speech: `${title}. ${message.speech}`,
                    card: {
                        title: title,
                        info: message.card
                    }
                });
            })
            .catch(error => {
                reject(error)
                return
            });
        });
    }


    timesMessage(stop) {
        const message = {
            speech: "",
            card: ""
        }

      if (stop == null) {
        message.speech = "Sin información"
        message.card = message.speech
        return message;
      }

      if (stop.times == null || stop.times.length == 0) {
        message.speech = "No hay información de llegadas"
        message.card = message.speech
        return message;
      }

      let text = ""
      let card = ""

      stop.times.forEach(route => {
        text += `La línea ${route.name} `
        card += `${route.name}: `

        if (route.time < 1) {
          text += `está llegando`
          card += `llegando`
        } else if (route.time == 1) {
          text += `llega en ${route.time} minuto`
          card += `${route.time} minuto`
        } else {
          text += `llega en ${route.time} minutos`
          card += `${route.time} minutos`
        }

        text += `<break strength="x-strong"/>`
        card += `\n`
      });
    
      message.speech = text
      message.card = card

      return message
    }

}


module.exports = new Granada();