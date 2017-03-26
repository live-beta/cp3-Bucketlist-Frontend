import { Cp3BucketlistFrontendPage } from './app.po';

describe('cp3-bucketlist-frontend App', () => {
  let page: Cp3BucketlistFrontendPage;

  beforeEach(() => {
    page = new Cp3BucketlistFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
