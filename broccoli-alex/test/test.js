
var Alex = require('..');
var assert = require('assert');
var broccoli = require('broccoli');
var walkSync = require('walk-sync');
var fs = require('fs');

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

      let expectedTests =
        "QUnit.module('Alex.js');\n" +
        "QUnit.test('has-errors.hbs should pass Alex.js', function(assert) {\n" +
        "  assert.expect(1);\n" +
        "  assert.ok(false, '`boogeyman` may be insensitive, use `boogey` instead');\n" +
        "});\n" +
        "QUnit.test('has-errors.hbs should pass Alex.js', function(assert) {\n" +
        "  assert.expect(1);\n" +
        String.raw`  assert.ok(false, 'Be careful with \u201Chell\u201D, it\u2019s profane in some cases');` +
        "\n});\n";

      return runAlex(
        'test/fixtures/has-errors'
      ).then(results => {

        let generatedTest = walkSync(results.outputPath, ['**/*.js']);
        let testContent = fs.readFileSync(results.outputPath + '/' + generatedTest[0])

        assert.equal(String(testContent).toString(), expectedTests);
      });

    });

    it('generates correct passing test string', function () {

      let expectedTest =
        "QUnit.module('Alex.js');\n" +
        "QUnit.test('no-errors.hbs passed Alex.js', function(assert) {\n" +
        "  assert.expect(1);\n" +
        "  assert.ok(true, 'no-errors.hbs passed Alex.js');\n" +
        "});\n";

      return runAlex(
        'test/fixtures/no-errors'
      ).then(results => {

        let generatedTest = walkSync(results.outputPath, ['**/*.js']);
        let testContent = fs.readFileSync(results.outputPath + '/' + generatedTest[0])

        assert.equal(String(testContent).toString(), expectedTest);
      });
    });

  });
});


function runAlex(sourcePath) {
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
