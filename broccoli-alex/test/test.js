
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

  describe('Tests', function() {

    describe('Generated tests', function() {

      it('correctly handled nested folders', async function() {

        let results = await new broccoli.Builder(
          new Alex('test/fixtures/test-generation')
        ).build();

        console.log(results);
        assert.equal(results.length, 3);
      });
      it('generates correct failing test string', function () {
      });
      it('generates correct passing test string', function () {
      });
    });
  });
});