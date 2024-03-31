import process from 'node:process'
import { expect, test, jest } from '@jest/globals'
import chalk from 'chalk'

import type * as XCrawl from 'x-crawl'

const args = process.argv.slice(3)
const environment = args[0]

const targetPath = environment === 'pro' ? 'publish/' : 'packages/'
const createCrawl = (require(targetPath) as typeof XCrawl).createCrawl

jest.setTimeout(60000)

/* 1.Written */
// 1.1.written string
async function writtenString() {
  const testCrawlApp = createCrawl()

  const res = await testCrawlApp.crawlHTML('http://localhost:8888/html')

  return res.isSuccess
}

// 1.2.written CrawlHTMLDetailConfig
async function writtenCrawlHTMLDetailConfig() {
  const testCrawlApp = createCrawl()

  const res = await testCrawlApp.crawlHTML({
    url: 'http://localhost:8888/html'
  })

  return res.isSuccess
}

// 1.3.written (string | CrawlHTMLDetailConfig)[]
async function writtenStringAndCrawlHTMLDetailConfigArr() {
  const testCrawlApp = createCrawl()

  const res = await testCrawlApp.crawlHTML([
    'http://localhost:8888/html',
    { url: 'http://localhost:8888/html' }
  ])

  return res.reduce((prev, item) => prev && item.isSuccess, true)
}

// 1.4.written CrawlHTMLAdvancedConfig
async function writtenCrawlHTMLAdvancedConfig() {
  const testCrawlApp = createCrawl()

  const res = await testCrawlApp.crawlHTML({
    targets: [
      'http://localhost:8888/html',
      { url: 'http://localhost:8888/html' }
    ]
  })

  return res.reduce((prev, item) => prev && item.isSuccess, true)
}

/* 2.Loader Config */
// 2.1.Loader Base Config
async function loaderBaseConfig() {
  const testCrawlApp = createCrawl({
    baseUrl: 'http://localhost:8888',
    proxy: { urls: ['http://localhost:14892'] },
    timeout: 10000,
    intervalTime: { max: 1000 },
    maxRetry: 0
  })

  const res = await testCrawlApp.crawlHTML(['/html', '/html'])

  return res.reduce((prev, item) => prev && item.isSuccess, true)
}

// 2.2.Loader Advanced Config
async function loaderAdvancedConfig() {
  const testCrawlApp = createCrawl({
    baseUrl: 'http://localhost:8888'
  })

  const res = await testCrawlApp.crawlHTML({
    targets: ['/html', '/html'],
    proxy: { urls: ['http://localhost:14892'] },
    timeout: 10000,
    intervalTime: { max: 1000 },
    maxRetry: 0
  })

  return res.reduce((prev, item) => prev && item.isSuccess, true)
}

test('crawlHTML - writtenString', async () => {
  console.log(
    chalk.bgGreen('================ crawlHTML - writtenString ================')
  )
  await expect(writtenString()).resolves.toBe(true)
})

test('crawlHTML - writtenCrawlHTMLDetailConfig', async () => {
  console.log(
    chalk.bgGreen(
      '================ crawlHTML - writtenCrawlHTMLDetailConfig ================'
    )
  )
  await expect(writtenCrawlHTMLDetailConfig()).resolves.toBe(true)
})

test('crawlHTML - writtenStringAndCrawlHTMLDetailConfigArr', async () => {
  console.log(
    chalk.bgGreen(
      '================ crawlHTML - writtenStringAndCrawlHTMLDetailConfigArr ================'
    )
  )
  await expect(writtenStringAndCrawlHTMLDetailConfigArr()).resolves.toBe(true)
})

test('crawlHTML - writtenCrawlHTMLAdvancedConfig', async () => {
  console.log(
    chalk.bgGreen(
      '================ crawlHTML - writtenCrawlHTMLAdvancedConfig ================'
    )
  )
  await expect(writtenCrawlHTMLAdvancedConfig()).resolves.toBe(true)
})

/* 2.Loader Config */
test('crawlHTML - loaderBaseConfig', async () => {
  console.log(
    chalk.bgGreen(
      '================ crawlHTML - loaderBaseConfig ================'
    )
  )
  await expect(loaderBaseConfig()).resolves.toBe(true)
})

test('crawlHTML - loaderAdvancedConfig', async () => {
  console.log(
    chalk.bgGreen(
      '================ crawlHTML - loaderAdvancedConfig ================'
    )
  )
  await expect(loaderAdvancedConfig()).resolves.toBe(true)
})
