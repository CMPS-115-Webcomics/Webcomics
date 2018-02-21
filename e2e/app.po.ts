import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolbarTitle() {
    return element(by.css('.toolbar-title')).getText();
  }
}
