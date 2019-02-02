'use strict'

var RequestHelper = require('../RequestHelper.js');

const appID = process.env.TMBAPPID;
const appKey = process.env.TMBKEY;

class TMBAPI {
    constructor(host, port = 80) {
        this.host = host;
        this.port = port;
        this.requestHelper = new RequestHelper(this.host, this.port);
    }

    apiTimes(stopId = 0) {
        return new Promise((resolve, reject) => {
           this.requestHelper.get(`/v1/ibus/stops/${stopId}?app_id=${appID}&app_key=${appKey}`).then(data => {
                resolve(data);
           }).catch(error => {
                reject(error);
           });
        });
    }
}

module.exports = TMBAPI;