const AWS = require('aws-sdk')
const uuid = require('uuid')
const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
  app.get('/api/upload', requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid.v4()}.jpeg`
    s3.getSignedUrl('putObject', {
      Bucket: keys.blogPhotosBucket,
      ContentType: 'image/jpeg',
      Key: key
    }, (err, url) => {
      res.send({key, url})
    })
  })
}