const redis = require('redis')
const { redisURI } = require('../config/keys')
const util = require('util')

const client = redis.createClient(redisURI)
client.hget = util.promisify(client.hget)
client.hset = util.promisify(client.hset)
client.del = util.promisify(client.del)
module.exports = client