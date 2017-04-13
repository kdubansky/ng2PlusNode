import { MdlDemoPage } from './app.po';

describe('mdl-demo App', () => {
  let page: MdlDemoPage;

  beforeEach(() => {
    page = new MdlDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
