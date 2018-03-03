
var Alex = require('..');
var assert = require('assert');
var broccoli = require('broccoli');
var walkSync = require('walk-sync');

describe('Broccoli Alex plugin', function() {

  describe('Broccoli build', function() {

    it('should be true', function() {
      assert.equal(1, 1);
    });

    it('should catch errors', async function() {

      let onComplete = function(results) {
        assert.equal(results.length, 2);
      };

      await new broccoli.Builder(
        new Alex('test/fixtures/has-errors', { onComplete })
      ).build();
    });
  });

  describe('Generated tests', function() {

    it('correctly handled nested folders', function() {
      return runAlex(
        'test/fixtures/test-generation'
      ).then(results => {
        let generatedTests = walkSync(results.outputPath, ['**/*.js']);
        assert.ok(generatedTests.length, 3, 'generated all 3 tests');
      });
    });

    it('generates correct failing test string', function () {
    });

    it('generates correct passing test string', function () {
    });

  });
});


function runAlex(sourcePath) {
  debugger
  let node = new Alex(sourcePath, {
    outputPath: sourcePath
  });
  let builder = new broccoli.Builder(node);

  let promise = builder.build().then(() => ({
    outputPath: node.outputPath
  }));

  // promise.finally(() => { builder.cleanup(); });

  return promise;
}
