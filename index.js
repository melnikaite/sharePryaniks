const puppeteer = require('puppeteer');
const getChromePath = require('@browserless/aws-lambda-chrome')({path: '/tmp'});

const isLambda = !!process.env.LAMBDA_TASK_ROOT;
const getExecutablePath = async () => (isLambda ? getChromePath() : undefined);

exports.myHandler = async function (event, context) {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--disable-gpu',
      '--single-process',
      '--no-zygote',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars'
    ],
    executablePath: await getExecutablePath()
  });
  const page = await browser.newPage();
  await page.goto(`https://${event.domain}.pryaniky.com`);
  await page.type('#UserName', event.login);
  await page.type('#Password', event.password);
  await Promise.all([page.waitForNavigation(), page.click('#logonButton')]);
  await page.click('.n-b-more .icon-down');
  await page.click('.icon-givecake');
  await page.type('.pryanikyPostType input', event.to);
  await page.waitForSelector('.select2-result');
  await page.click('.select2-result');
  await page.click('.hmanyandforwhat');
  await page.waitForSelector('.count-inp');
  const amountInput = await page.$('.count-inp');
  await amountInput.press('Backspace');
  await page.type('.count-inp', event.amount.toString());
  await page.click('.reasonThanksCat input[value="231"]');
  await page.click('.pryaniky-reason-selector button');
  await page.type('.mentions-input-box textarea', ':)');
  await page.click('.postblock input');
  await page.waitFor(1);
  await browser.close();
};
