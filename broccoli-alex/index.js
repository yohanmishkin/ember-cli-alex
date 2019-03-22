var alex = require('alex');
var Filter = require('broccoli-filter');
var testGenerators = require('aot-test-generators');

function Alex(path, options = {}) {
  Filter.call(this, path, options);

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

  if (passed) {
    return (
      generator.suiteHeader('Alex.js | tests') +
      generator.test(relativePath, passed) +
      generator.suiteFooter()
    );
  }

  return (
    generator.suiteHeader('Alex.js | tests') +
    messages.reduce((assertions, current) => {
      return (assertions += generator.test(
        relativePath,
        passed,
        current.message
      ));
    }, '') +
    generator.suiteFooter()
  );
};

Alex.prototype.getDestFilePath = function getDestFilePath(relativePath) {
  return `${relativePath}.alex-test.js`;
};
