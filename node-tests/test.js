
var expect = chai.expect;

let lintErrors;

describe('Broccoli Alex plugin', function() {

  beforeEach(function() {
    lintErrors = [];
  });

  describe('Broccoli build', function() {
    it('catches errors', function () {
      buildAndLint('tests/fixtures/has-errors');
      expect(lintErrors[0].warnings).to.be.an('array').that.includes(2);
    });

    it('stylelint plugins work', function () {
      buildAndLint('tests/fixtures/test-plugin');
      expect(lintErrors[0].warnings).to.be.an('array').that.includes(1);
    });

    it('returns useful source name onError', function () {
      buildAndLint('tests/fixtures/test-plugin');
      expect(lintErrors[0].source).to.equal('has-error.scss');
    });
  });

  describe('Tests', function() {

    describe('Generated tests', function() {
      it('correctly handled nested folders', function() {
      });
      it('generates correct failing test string', function () {
      });
      it('generates correct passing test string', function () {
      });
    });
  });
});

function buildAndLint(sourcePath) {
  lintErrors.push({
    warnings: [],
    source: ''
  });
}