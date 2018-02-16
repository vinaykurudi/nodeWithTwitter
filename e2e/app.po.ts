import { browser, by, element } from 'protractor';

export class NodeTwitterFeedPage {
  navigateTo() {
    return browser.get('/');
  }

  getSearchText() {
    return element(by.name("searchText"));
  }
  getSearchButton(){

    return element(by.partialButtonText("Search"));
  }
}
