const { cleanCache } = require('../services/mongo-cache')

module.exports = async (req, res, next) => {
    await next()
    await cleanCache(`${req.user.id}`)
}
