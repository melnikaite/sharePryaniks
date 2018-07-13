const puppeteer = require('puppeteer');
const getChromePath = require('@browserless/aws-lambda-chrome')({path: '/tmp'});

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    executablePath: await getChromePath(),
    args: [
      '--disable-gpu',
      '--single-process',
      '--no-zygote',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
    ],
  });
  console.log('Browser is launched');
  const page = await browser.newPage();
  console.log('Tab is opened');
  await page.goto(`https://${event.domain}.pryaniky.com/Account/LogOn`, {waitUntil: 'networkidle0'});
  console.log('Url is opened');
  await page.type('#UserName', event.login);
  console.log('Login typed');
  await page.type('#Password', event.password);
  console.log('Password is typed');
  const navigationPromise = page.waitForNavigation({waitUntil: 'networkidle2'});
  await page.$eval('form', el => el.submit());
  console.log('Creds submitted');
  await navigationPromise;
  console.log('Redirected');
  await page.waitForSelector('.post-items-type .icon-givecake', {visible: true});
  console.log('Cake is found');
  await page.$eval('.post-items-type .icon-givecake', el => el.click());
  console.log('Cake is clicked');
  await page.type('#s2id_autogen2', event.to);
  console.log('Receiver is typed');
  await page.waitForResponse(response => new RegExp('JsonUsersHelper').test(response.url()));
  console.log('Receiver is found');
  await page.keyboard.press('Enter');
  console.log('Receiver is selected');
  await page.$eval('.hmanyandforwhat', el => el.click());
  console.log('Form opened');
  await page.waitForSelector('.count-inp', {visible: true});
  console.log('Input found');
  const amountInput = await page.$('.count-inp');
  console.log('Input saved');
  await amountInput.press('Backspace');
  console.log('Backspace pressed');
  await page.type('.count-inp', event.amount.toString());
  console.log('New amount typed');
  await page.$eval('.reasonThanksCat input[value="231"]', el => el.click());
  console.log('Reason selected');
  await page.$eval('.pryaniky-reason-selector button', el => el.click());
  console.log('Reason is saved');
  await page.type('.mentions-input-box textarea', ':)');
  console.log('Comment is typed');
  await page.$eval('.postblock input', el => el.click());
  console.log('Submitted');
  await page.waitForResponse(response => new RegExp('PostMessage').test(response.url()));
  console.log('Response is received');
  await browser.close();
  console.log('Browser is closed');
  return true;
};
