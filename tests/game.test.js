const { test, expect } = require('@playwright/test');
const GamePage = require('../pages/GamePage');

test.describe('Slot Game Tests', () => {
  let gamePage;

  test.beforeEach(async ({ page }) => {
    gamePage = new GamePage(page);
    await gamePage.navigate();
    await gamePage.login();
    await page.waitForTimeout(30000);
  });

  test('Take a screenshot of the Bet Menu and Paytable.', async () => {
    // Screenshot of Bet Menu
    await test.step('Click Play to start the game', async () => {
      await gamePage.clickPlay();
    });    
    await test.step('Open bet menu', async () => { 
      await gamePage.openBetMenu();});
    await test.step('Take screenshot of bet menu', async () => {
      await gamePage.takeScreenshot('screenshots/bet-menu.png')});
    await test.step('Close bet menu', async () => {
      await gamePage.closeBetMenu()});

    // Screenshot of Paytable
    await test.step('Open paytable', async () => { 
      await gamePage.openPaytable();});
    await test.step('Take screenshot of paytable', async () => {
      await gamePage.takeScreenshot('screenshots/paytable.png');});
    await test.step('Close paytable', async () => {
      await gamePage.closePaytable();});
  });

  test('Make a spin and take a screenshot during the spin.', async () => {
    await test.step('Click Play to start the game', async () => {
      await gamePage.clickPlay();
    }); 
    await test.step('Initiate a spin', async () => {
    await gamePage.spin();});
    await test.step('Take screenshot during the spin', async () => {
    await gamePage.takeScreenshot('screenshots/spin-in-progress.png');});
  });

  test('3. Check browser tab name', async () => {
    const title = await gamePage.getPageTitle();
    await test.step('Get page title', async () => {
    console.log('Browser tab title:', title);});
    await test.step('Verify title is not empty', async () => {
    expect(title).toBeTruthy();});
  });

 test('4. Verify game name inside GameRules', async () => {
  await test.step('Click Play to start the game', async () => {
      await gamePage.clickPlay();
    }); 
  await test.step('Open paytable and game rules', async () => {
  await gamePage.openPaytable();
  await gamePage.openGameRules();});
  const gameName = await gamePage.getGameName();
  console.log('Game name:', gameName);
  await test.step('Verify game name is correct', async () => {
  expect(gameName).toBe('Carravan of Riches');});
  await test.step('Close game rules', async () => {
  await gamePage.closeGameRules();});
});

  test('5. Verify RTP value inside GameRules', async () => {
  await test.step('Click Play to start the game', async () => {
      await gamePage.clickPlay();
    }); 
  await test.step('Open paytable and game rules', async () => {
  await gamePage.openPaytable();
  await gamePage.openGameRules();});

  const rtpText = await gamePage.getRTPValue();
  console.log('RTP value:', rtpText);
  await test.step('Verify RTP value is valid', async () => {
  expect(rtpText).toBeTruthy();
  const rtpNumber = parseFloat(rtpText.replace('%', ''));
  expect(rtpNumber).toBeGreaterThan(0); });
  await test.step('Close game rules', async () => {
  await gamePage.closeGameRules();
  });});

  test('6. Check if all images in Paytable are visible', async () => {
  await test.step('Click Play to start the game', async () => {
      await gamePage.clickPlay();
    }); 
  await test.step('Open paytable', async () => {
  await gamePage.openPaytable();});
  const result = await gamePage.areAllImagesVisible();
  console.log('All images visible:', result);
  await test.step('Verify all images are visible', async () => {
  expect(result).toBe(true);});
  await test.step('Close paytable', async () => {
  await gamePage.closePaytable();});
  });
});