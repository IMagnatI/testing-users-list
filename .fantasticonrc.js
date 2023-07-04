module.exports = {
  inputDir: './assets/icons', // (required)
  outputDir: './static/fonts', // (required)
  fontTypes: ['ttf', 'woff', 'woff2'],
  assetTypes: ['ts', 'scss'],
  fontsUrl: '/fonts',
  formatOptions: {
    ts: {
      singleQuotes: true,
    },
  },
  pathOptions: {
    ts: './types/IconTypes.ts',
    scss: './assets/styles/variables/_icons.scss',
  },
}
