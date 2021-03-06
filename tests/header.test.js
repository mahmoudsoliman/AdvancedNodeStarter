const { Page } = require('./helpers/page')
const config = require('./helpers/config')

describe('header tests', async () => {
  let page
  beforeEach(async () => {
    page = await Page.build()
    await page.goto(config.httpPrefix + config.baseUrl)
  })

  afterEach(async () => {
    await page.browser.close()
  })

  test('header contains the app logo text', async () => {
    await page.waitFor('.brand-logo')
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)
    expect(text).toEqual('Blogster')
  })

  test(' header contains login link in case of user not logged in', async () => {
    const text = await page.$eval('.right a', el => el.innerHTML)
    expect(text).toEqual('Login With Google')
  })
})
