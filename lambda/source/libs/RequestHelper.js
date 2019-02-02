'use strict'

var http = require('https')


class Request {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }

    get(endPoint) {
        return new Promise((resolve, reject) => {
            http.get({
                hostname: this.host,
                port: this.port,
                path: endPoint,
                agent: false 
            }, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                res.setEncoding('utf8');
                let rawData = '';

                res.on('data', (chunk) => { 
                    rawData += chunk; 
                });
                
                res.on('end', () => {
                    let data = rawData;

                    try {
                        data = JSON.parse(rawData);
                    } catch (e) {
                        console.error(e.message);
                    }

                    if (statusCode == 200) {
                        resolve(data);
                    } else {
                        reject({code: statusCode, body: data})
                    }
                });     

            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
                reject(new Error(`Request Failed.\nError: ${e.message}`));
            });
        });
    }

}

module.exports = Request;