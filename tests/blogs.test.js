const { Page } = require('./helpers/page')
const { createUser } = require('./factories/user')

let page

describe('when user is logged in', async () => {
  beforeEach(async () => {
    page = await Page.build()
    await page.goto('localhost:3000/')
    const user = await createUser()
    await page.login(user)
    await page.goto('localhost:3000/blogs')
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