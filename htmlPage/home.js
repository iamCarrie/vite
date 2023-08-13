[
  {
    filename: 'index.html',
    template: '_layout.ejs',
    chunks: ['index'],
    excludeAssets: [/index\.js/],
    title: meta.htmlTitle,
    shareTitle: meta.htmlShareTitle,
    description: meta.htmlDescription,
    url: meta.url,
    shareImg: meta.shareImg + meta.version
  }
];
