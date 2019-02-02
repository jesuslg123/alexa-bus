'use strict'

var RequestHelper = require('../RequestHelper.js');

class GranadaBusAPI {
    constructor(host, port = 80) {
        this.host = host;
        this.port = port;
        this.requestHelper = new RequestHelper(this.host, this.port);
    }

    apiTimes(stopId = 0) {
        return new Promise((resolve, reject) => {
           this.requestHelper.get(`/stops/${stopId}`).then(data => {
                resolve(data);
           }).catch(error => {
                reject(error);
               });
        });
    }

}

module.exports = GranadaBusAPI;