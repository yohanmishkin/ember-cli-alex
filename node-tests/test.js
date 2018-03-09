
var assert = require('assert');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;

describe('ember-cli-alex', function() {

  it('passes if alex.js tests pass', function() {
    return emberTest().then(function(result) {
      assert.ifError(result.error);
    //   expect(result.stdout.match(/[^\r\n]+/g))
    //     .to.contain('ok 1 PhantomJS 2.1 - ESLint | app.js: should pass ESLint')
    //     .to.contain('ok 2 PhantomJS 2.1 - ESLint | controllers/thing.js: should pass ESLint')
    //     .to.contain('ok 3 PhantomJS 2.1 - ESLint | helpers/destroy-app.js: should pass ESLint')
    //     .to.contain('ok 4 PhantomJS 2.1 - ESLint | helpers/module-for-acceptance.js: should pass ESLint')
    //     .to.contain('ok 5 PhantomJS 2.1 - ESLint | helpers/resolver.js: should pass ESLint')
    //     .to.contain('ok 6 PhantomJS 2.1 - ESLint | helpers/start-app.js: should pass ESLint')
    //     .to.contain('ok 7 PhantomJS 2.1 - ESLint | models/thing.js: should pass ESLint')
    //     .to.contain('ok 8 PhantomJS 2.1 - ESLint | resolver.js: should pass ESLint')
    //     .to.contain('ok 9 PhantomJS 2.1 - ESLint | router.js: should pass ESLint')
    //     .to.contain('ok 10 PhantomJS 2.1 - ESLint | test-helper.js: should pass ESLint')
    //     .to.not.contain('not ok 11 PhantomJS 2.1 - ESLint | unused.js: should pass ESLint');
    // })
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
