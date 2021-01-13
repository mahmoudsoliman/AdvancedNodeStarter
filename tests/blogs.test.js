const { Page } = require('./helpers/page')
const { createUser } = require('./factories/user')
const config = require('./helpers/config')

let page

describe('when user is logged in', async () => {
  beforeEach(async () => {
    page = await Page.build()
    await page.goto(config.httpPrefix + config.baseUrl)
    const user = await createUser()
    await page.login(user)
    await page.goto(config.httpPrefix + config.baseUrl + '/blogs')
  })

  afterEach(async () => {
    await page.browser.close()
  })

  test('creating new blog post button exist', async () => {
    await page.waitFor('.material-icons')
    const addIcon = await page.$eval('.material-icons', el => el.innerHTML)
    expect(addIcon).toEqual('add')
  })
})