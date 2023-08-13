const meta = require('./htmlPage/html.meta.js');
// const home     = require('./htmlPage/home.js');

module.exports = {
  port: 12300,
  // fonts :'static/fonts/',
  filePath: {
    scripts: 'scripts',
    css: 'assets/css/',
    csspath: '../../',
    imgs: 'assets/imgs/',
    svgs: '_svg/',
    component: '_component/',
    container: '_container/'
  },
  copy: [
    { from: 'static/imgs', to: 'static/imgs' }
  ],
  html: [
    {
      filename: 'index.html',
      template: '_layout.ejs',
      chunks: ['index'],
      // excludeAssets: [/index\.js/],
      title: meta.htmlTitle,
      shareTitle: meta.htmlShareTitle,
      description: meta.htmlDescription,
      url: meta.url,
      shareImg: meta.shareImg + meta.version
    }
  ]
};
