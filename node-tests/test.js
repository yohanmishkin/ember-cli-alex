
var assert = require('assert');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;
var expect = require('chai').expect;

describe('ember-cli-alex', function() {

  this.timeout(60000);

  it('passes if alex.js tests pass', function() {
    return emberTest().then((result) => {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 PhantomJS 2.1 - Alex.js | application.hbs: should pass Alex.js')
        .to.not.contain('not ok 11 PhantomJS 2.1 - ESLint | unused.js: should pass ESLint');
    });
  });

});


function emberTest() {
  return new Promise(function(resolve) {
    exec('node_modules\\.bin\\ember test', { cwd: __dirname + '/..', env: process.env }, function (error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
