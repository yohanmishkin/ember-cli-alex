var Alex = require('..');
var assert = require('assert');
var broccoli = require('broccoli');
var walkSync = require('walk-sync');
var fs = require('fs');

describe('Broccoli Alex plugin', function() {
  describe('Broccoli build', function() {
    it('should be true', function() {
      assert.strictEqual(1, 1);
    });

    it('should catch errors', function(done) {
      let onComplete = function(results) {
        assert.strictEqual(results.length, 2);
      };

      new broccoli.Builder(
        new Alex('broccoli-alex/test/fixtures/has-errors', { onComplete })
      )
        .build()
        .then(done);
    });
  });

  describe('Generated tests', function() {
    it('correctly handled nested folders', function() {
      return runAlex('broccoli-alex/test/fixtures/test-generation').then(
        results => {
          let generatedTests = walkSync(results.outputPath, ['**/*.js']);
          assert.ok(generatedTests.length, 3, 'generated all 3 tests');
        }
      );
    });

    it('generates correct failing test string', function() {
      let expectedTests =
        "QUnit.module('Alex.js | tests');\n" +
        "QUnit.test('has-errors.hbs', function(assert) {\n" +
        '  assert.expect(1);\n' +
        "  assert.ok(false, '`boogeyman` may be insensitive, use `boogey` instead');\n" +
        '});\n' +
        "QUnit.test('has-errors.hbs', function(assert) {\n" +
        '  assert.expect(1);\n' +
        String.raw`  assert.ok(false, 'Be careful with \u201Chell\u201D, it\u2019s profane in some cases');` +
        '\n});\n';

      return runAlex('broccoli-alex/test/fixtures/has-errors').then(results => {
        let generatedTest = walkSync(results.outputPath, ['**/*.js']);
        let testContent = fs.readFileSync(
          results.outputPath + '/' + generatedTest[0]
        );

        assert.strictEqual(String(testContent).toString(), expectedTests);
      });
    });

    it('generates correct passing test string', function() {
      let expectedTest =
        "QUnit.module('Alex.js | tests');\n" +
        "QUnit.test('no-errors.hbs', function(assert) {\n" +
        '  assert.expect(1);\n' +
        "  assert.ok(true, 'no-errors.hbs');\n" +
        '});\n';

      return runAlex('broccoli-alex/test/fixtures/no-errors').then(results => {
        let generatedTest = walkSync(results.outputPath, ['**/*.js']);
        let testContent = fs.readFileSync(
          results.outputPath + '/' + generatedTest[0]
        );

        assert.strictEqual(String(testContent).toString(), expectedTest);
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
