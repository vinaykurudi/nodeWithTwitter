import { NodeTwitterFeedPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('node-twitter-feed App', () => {
  let page: NodeTwitterFeedPage;

  beforeEach(() => {
    page = new NodeTwitterFeedPage();
  });

  it('should display empty input box', () => {
    page.navigateTo();
    expect(page.getSearchText().getAttribute('value')).toEqual('');
  });
  it('should contains search Tweets as button text', () => {
    expect(page.getSearchButton()).not.toBe(null);
  });
  it('should send some text to search box', () => {
    page.getSearchText().sendKeys('#modi');
    expect(page.getSearchText().getAttribute('value')).toEqual('#modi');
  });
  /* it('should be able to click search tweets button', () => {
    page.getSearchButton().click();
    browser.wait(()=>{
      expect(page.getSearchText().getAttribute('value')).toEqual('#modi');
    });
    
  });*/
   it('should be able to reset text box', () => {
    page.getSearchText().clear();
    expect(page.getSearchText().getAttribute('value')).toEqual('');
  });
});
