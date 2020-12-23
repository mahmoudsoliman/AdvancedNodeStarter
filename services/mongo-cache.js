const mongoose = require('mongoose')
const redis = require('./redis')


const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (keyPrefix = '', expiration = 3000) {
    console.log('cacheEnabled')
    this.cacheEnabled = true
    this.cacheKeyPrefix = keyPrefix
    this.cacheExpiration = expiration
    return this
}

mongoose.Query.prototype.exec = async function () {
    if(!this.cacheEnabled){
        return exec.apply(this, arguments)
    }

    const key = `${this.mongooseCollection.name}:${JSON.stringify(this.getQuery())}`
    const cachedValue = await redis.hget(this.cacheKeyPrefix, key)
    if(cachedValue){
        console.log('FROM CACHE')
        return  JSON.parse(cachedValue)
    }
    
    const result = await exec.apply(this, arguments)
    console.log({key, result, exp: this.cacheExpiration})
    await redis.hset(this.cacheKeyPrefix, key, JSON.stringify(result))
    redis.expire(this.cacheKeyPrefix, this.cacheExpiration)
    console.log('FROM DB')
    return result
}

module.exports.cleanCache = async (key) => {
    console.log({key})
    redis.del(key)
}