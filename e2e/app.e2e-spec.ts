import { SerVoPage } from './app.po';

describe('ser-vo App', () => {
  let page: SerVoPage;

  beforeEach(() => {
    page = new SerVoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
