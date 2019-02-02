'use strict'

const FAVORITES_TABLE = `favorites_${process.env.CITY}`

class Favorites {
    constructor() {
        this.tableName = FAVORITES_TABLE
    }

    async add(handlerInput, name, stopID) {
        if (!handlerInput) {
            throw("No input handler found")
        }

        const attributes = await this._read(handlerInput)

        if (!attributes.favorites) {
            attributes.favorites = {}
        }

        console.log(`Add favorite ${name} ${stopID}`)

        attributes.favorites[name] = stopID
        await this._save(handlerInput, attributes)
    }

    async delete(handlerInput, name) {
        const attributes = await this._read(handlerInput)

        if (attributes.favorites && attributes.favorites[name]) {
            delete attributes.favorites[name]
            await this._save(handlerInput, attributes)
        }
        
    }

    async get(handlerInput, name) {
        const attributes = await this.getAll(handlerInput)
        return attributes[name]
    }

    async getAll(handlerInput) {
        const attributes = await this._read(handlerInput)
        return attributes.favorites || {}
    }

    async _read(handlerInput) {
        const attributes = await handlerInput.attributesManager.getPersistentAttributes()
        return attributes;
    }

    async _save(handlerInput, attributes) {
        handlerInput.attributesManager.setPersistentAttributes(attributes)
        await handlerInput.attributesManager.savePersistentAttributes()
    }
    
}

module.exports = new Favorites()