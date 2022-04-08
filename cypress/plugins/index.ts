/**
 * @type {Cypress.PluginConfig}
 */

import cucumber = require('cypress-cucumber-preprocessor');
import browserify = require('@cypress/browserify-preprocessor');

module.exports = (on) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: require.resolve('typescript'),
  };
  on('file:preprocessor', cucumber.default(options));
};
