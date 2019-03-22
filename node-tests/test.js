var fs = require('fs-extra');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;
var expect = require('chai').expect;

var FAILING_FILE =
  __dirname + '/../tests/dummy/app/templates/howinsenstive.hbs';

describe('ember-cli-alex', function() {
  this.timeout(60000);

  afterEach(function() {
    fs.removeSync(FAILING_FILE);
  });

  it('passes if alex.js tests pass', function() {
    return emberTest().then(result => {
      expect(result.error).to.not.exist;

      let testResults = result.stdout.match(/[^\r\n]+/g).filter(testResult => {
        return testResult.includes('Alex.js | tests');
      });

      for (let testOutput of testResults) {
        expect(testOutput).to.match(/^ok/);
      }
    });
  });

  it('fails if an alex.js test fails', function() {
    fs.outputFileSync(FAILING_FILE, 'He dont care');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;

      let testResults = result.stdout.match(/[^\r\n]+/g).filter(testResult => {
        return testResult.includes('Alex.js | tests');
      });

      let passingTests = testResults.filter(result => {
        return result.match(/^ok/);
      });

      for (let testOutput of passingTests) {
        expect(testOutput).to.match(/^ok/);
      }

      let failingTests = testResults.filter(result => {
        return result.match(/^not ok/);
      });

      for (let testOutput of failingTests) {
        expect(testOutput).to.match(/^not ok/);
      }
    });
  });
});

function emberTest() {
  return new Promise(function(resolve) {
    exec('ember test', { cwd: __dirname + '/..', env: process.env }, function(
      error,
      stdout,
      stderr
    ) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
