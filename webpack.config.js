const path = require('path');
const { createDefaultConfig } = require('@open-wc/building-webpack');

const rendererConfig = createDefaultConfig({
  input: path.resolve(__dirname, 'src', 'renderer', 'index.html'),
});

rendererConfig.output.path = path.resolve(__dirname, 'builds', 'development', 'renderer');

module.exports = {
  renderer: rendererConfig,
  main: {},
}
