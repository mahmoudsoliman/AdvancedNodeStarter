const puppeteer = require('puppeteer')
const { createSession } = require('../factories/session')

class CustomePage {
  static async build () {
    const browser = await puppeteer.launch({
      headless: false
    })
    const page = await browser.newPage()
    const customePage = new CustomePage(browser, page)

    return new Proxy(customePage, {
      get: function(target, property) {
        return customePage[property] || page[property]
      }
    })
  }

  constructor (browser, page) {
    this.browser = browser
    this.page = page
  }

  async login (user) {
    const { session, sig } = await createSession(user)
    this.page.setCookie({
      name: 'session',
      value: session
    })
    this.page.setCookie({
      name: 'session.sig',
      value: sig
    })

    await this.page.goto('localhost:3000')
  }
}

module.exports = {
  Page: CustomePage
}