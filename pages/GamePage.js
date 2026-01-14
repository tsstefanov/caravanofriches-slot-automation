class GamePage {
  constructor(page) {
    this.page = page;
    this.url = 'http://31.211.204.187:4477/';
    this.username = 'guest';
    this.password = 'playgames';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login() {
    await this.page.click('a[href="/users/login"]');
    await this.page.waitForTimeout(1000);
    await this.page.fill('input[name="username"]', this.username);
    await this.page.fill('input[name="password"]', this.password);
    await this.page.click('input[type="submit"][value="Login"]');
    await this.page.waitForTimeout(3000);
    await this.page.click('text=CARAVAN OF RICHES');
    await this.page.waitForTimeout(5000);
  }

  async clickPlay() {
  await this.page.waitForTimeout(2000);
  await this.page.waitForFunction(() => {
    return typeof window.webdriverHook === 'function';
    
  });

  await this.page.evaluate(() => {
    webdriverHook(driverHooks.STARTSCREEN_CLICK_PLAY);
  });
}


  async spin() {
    await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
    await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_SPIN);
    });
  }

  async openBetMenu() {
  await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
  await this.page.waitForTimeout(2000);
  await this.page.evaluate(() => {
  webdriverHook(driverHooks.TRY_OPEN_BET_MENU);
  });
}

  async closeBetMenu() {
  await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
  await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_CLOSE_BET_MENU);
    });
    await this.page.waitForTimeout(1000);
  }

  async openPaytable() {
  await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
  await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_OPEN_MAIN_MENU);
    });
    await this.page.waitForTimeout(1000);
  }

  async closePaytable() {
  await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
  await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_CLOSE_MAIN_MENU);
    });
    await this.page.waitForTimeout(500);
  }

  async openGameRules() {
    await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
    await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_OPEN_GAME_RULES);
    });
    await this.page.waitForTimeout(1000);
  }

  async closeGameRules() {
    await this.page.waitForFunction(() => typeof window.webdriverHook === 'function');
    await this.page.waitForTimeout(2000);
    await this.page.evaluate(() => {
      webdriverHook(driverHooks.TRY_CLOSE_GAME_RULES);
    });
    await this.page.waitForTimeout(500);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

async getGameName() {
  return await this.page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/Carravan of Riches/);
    return match ? 'Carravan of Riches' : null;
  });
}

 async getRTPValue() {
  return await this.page.evaluate(() => {
    const rtpElement = document.querySelector('.rtp');
    return rtpElement ? rtpElement.innerText : null;
  });
}


  async areAllImagesVisible() {
  const images = await this.page.$$('img');

  if (images.length === 0) {
    return false;
  }

  for (const img of images) {
    if (!(await img.isVisible())) {
      return false;
    }
  }

  return true;
}

}

module.exports = GamePage;