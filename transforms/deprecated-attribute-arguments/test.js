'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  type: 'template',
  name: 'deprecated-attribute-arguments',
});
