
var Filter = require('broccoli-filter');
var broccoliNodeInfo = require('broccoli-node-info');
var alex = require('alex');
var testGenerators = require('aot-test-generators');

function Alex(templatesPath, options = {}) {

  Filter.call(this, templatesPath, options);

  if (options.onComplete) {
    this.onComplete = options.onComplete;
  }
}

module.exports = Alex;
Alex.prototype = Object.create(Filter.prototype);
Alex.prototype.constructor = Alex;
Alex.prototype.targetExtension = '.alex-test.js';

Alex.prototype.processString = function processString(content, relativePath) {
  let messages = alex(content).messages;

  let generator = testGenerators['qunit'];
  let passed = messages.length == 0;
  let assertions = [];

  return (
    generator.suiteHeader('Alex.js') +
    generator.test(relativePath + ' should pass Alex.js', passed, assertions) +
    generator.suiteFooter()
  );
}

Alex.prototype.getDestFilePath = function getDestFilePath(relativePath) {
  return `${relativePath}.alex-test.js`;
}
