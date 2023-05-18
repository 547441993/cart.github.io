const path = require('path');
const puppeteer = require('puppeteer');

const URL = 'http://localhost:8080/';

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
describe('购物车', () => {
  let browser = null;
  let context = null;
  let page = null;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 100
    });
    context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle0'
    });
    await page.setViewport({
      width: 1600,
      height: 800
    });
  }, 20000);

  afterAll(async () => {
    await browser.close();
  });

  // beforeEach(async () => {
  //   await page.evaluate(() => {
  //     localStorage.setItem('cart-data', '');
  //   });
  // });

  test('add cart one', async () => {
    await page.waitForSelector('.card-item:nth-child(1) .ant-btn');
    await page.screenshot({ path: path.join(__dirname, 'photo/add-cart-start.png') });
    await page.click('.card-item:nth-child(1) .ant-btn');
    await page.screenshot({ path: path.join(__dirname, 'photo/add-cart-end.png') });
  });

  test('click size', async () => {
    await page.waitForSelector('.cart-size-button-group');
    await page.screenshot({ path: path.join(__dirname, 'photo/click-size-start.png') });
    await page.click('.cart-size-button-group .ant-btn:nth-child(6)');
    await page.screenshot({ path: path.join(__dirname, 'photo/click-size-end.png') });
  });

  test('click price', async () => {
    await page.waitForSelector('.ant-radio-group');
    await page.screenshot({ path: path.join(__dirname, 'photo/click-price-start.png') });
    await page.click('.ant-radio-group .ant-radio-button-wrapper:nth-child(2)');
    await page.screenshot({ path: path.join(__dirname, 'photo/click-price-end.png') });
  });

  test('cart list', async () => {
    await page.waitForSelector('.cart-icon-container');
    await page.screenshot({
      path: path.join(__dirname, 'photo/cart-list-start.png')
    });
    await page.click('.cart-icon-container');
    await sleep(200);
    await page.screenshot({ path: path.join(__dirname, 'photo/cart-list-end.png') });
  });

  test('cart list add', async () => {
    await page.waitForSelector('.card-item-operate');
    await page.screenshot({
      path: path.join(__dirname, 'photo/cart-list-add-start.png')
    });
    await page.click('.card-item-operate .ant-btn:nth-child(3)');
    await sleep(200);
    await page.screenshot({ path: path.join(__dirname, 'photo/cart-list-add-end.png') });
  });
});
