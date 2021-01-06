const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.connect(keys.mongoURI, {useMongoClient: true})

jest.setTimeout(30000)