'use strict'

let TMBAPI = require('./TMBAPI.js')

const GET_STOP_MESSAGE = 'Información de la parada'

class Barcelona {
    constructor() {
        this.tmbAPI = new TMBAPI(process.env.BARNAAPI, 443)
    }

    getTimes(stopID) {
        return new Promise((resolve, reject) => { 
            this.tmbAPI.apiTimes(stopID)
                .then(result => {
                    console.log(result)

                    const { status = '', data : { ibus : times } = [] } = result || {}
                    let stop = null
                    const title = `${GET_STOP_MESSAGE} ${stopID}`
                    if (status != '') {
                        stop = {}
                        stop.times = times
                    }
                    const message = this.timesMessage(stop)
                    resolve({
                        speech: `${title}. ${message.speech}`,
                        card: {
                            title: title,
                            info: message.card
                        }
                    });
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                    return;
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
            return message
        }
  
        if (stop.times == null || stop.times.length == 0) {
            message.speech = "No hay información de llegadas"
            message.card = message.speech
            return message
        }
  
        let text = ""
        let card = ""

        stop.times.forEach(route => {
          text += `La línea ${route.line} `
          card += `${route.line}: `

          const { 't-in-min' : minutes } = route
          if (minutes < 1) {
            text += `está llegando`
            card += `llegando`
          } else if (minutes == 1) {
            text += `llega en ${minutes} minuto`
            card += `${minutes} minuto`
          } else {
            text += `llega en ${minutes} minutos`
            card += `${minutes} minutos`
          } 
          text += `.\n`
          card += `\n`
        });

        message.speech = text
        message.card = card
      
        return message
    }

    
  

}


module.exports = new Barcelona();