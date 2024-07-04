
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // 设置为 false 以便你能看到浏览器操作
  const page = await browser.newPage();

  // 打开登录页面
  await page.goto('https://c96.90123.com/city/index.ql');

  // 填写用户名
  await page.type('#userName', '1262283788@qq.com', { delay: 100 });

  // 填写密码
  await page.type('#password', '9517532846', { delay: 100 });

  // 暂停脚本运行，等待用户手动输入验证码
  console.log('请手动输入验证码，然后按回车继续...');
  await page.waitForSelector('#validcode', { visible: true });
  await page.focus('#validcode');
  await page.evaluate(() => {
    alert('请输入验证码，然后按回车继续...');
  });

  // 等待用户输入完验证码并按下回车
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  // 提交表单
  await page.click('.lbtn .btn');

  // 等待导航以确保表单提交成功
  await page.waitForNavigation();

  // 检查登录是否成功
  if (page.url().includes('success-url')) {
    console.log('Login successful');
  } else {
    console.log('Login failed');
  }

  // 关闭浏览器
  await browser.close();
})();
