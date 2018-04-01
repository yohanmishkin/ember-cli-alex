
var fs = require('fs-extra');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;
var expect = require('chai').expect;

var FAILING_FILE = __dirname + '/../tests/dummy/app/templates/howinsenstive.hbs';

describe('ember-cli-alex', function() {

  this.timeout(60000);

  afterEach(function() {
    fs.removeSync(FAILING_FILE);
  });

  it('passes if alex.js tests pass', function() {
    return emberTest().then((result) => {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 Chrome 65.0 - Alex.js: app.js should pass Alex.js')
        .to.contain('ok 5 Chrome 65.0 - Alex.js: dummy/templates/application.hbs should pass Alex.js')
        .to.contain('ok 6 Chrome 65.0 - Alex.js: helpers/destroy-app.js should pass Alex.js')
        .to.contain('ok 7 Chrome 65.0 - Alex.js: helpers/module-for-acceptance.js should pass Alex.js')
        .to.contain('ok 8 Chrome 65.0 - Alex.js: helpers/resolver.js should pass Alex.js')
        .to.contain('ok 9 Chrome 65.0 - Alex.js: helpers/start-app.js should pass Alex.js')
        .to.contain('ok 10 Chrome 65.0 - Alex.js: index.html should pass Alex.js')
        .to.contain('ok 11 Chrome 65.0 - Alex.js: resolver.js should pass Alex.js')
        .to.contain('ok 12 Chrome 65.0 - Alex.js: router.js should pass Alex.js')
        .to.contain('ok 13 Chrome 65.0 - Alex.js: test-helper.js should pass Alex.js');
    });
  });

  it('fails if an alex.js test fails', function() {

    fs.outputFileSync(FAILING_FILE, 'He dont care');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 Chrome 65.0 - Alex.js: app.js should pass Alex.js')
        .to.contain('ok 5 Chrome 65.0 - Alex.js: dummy/templates/application.hbs should pass Alex.js')
        .to.contain('ok 6 Chrome 65.0 - Alex.js: helpers/destroy-app.js should pass Alex.js')
        .to.contain('ok 7 Chrome 65.0 - Alex.js: helpers/module-for-acceptance.js should pass Alex.js')
        .to.contain('ok 8 Chrome 65.0 - Alex.js: helpers/resolver.js should pass Alex.js')
        .to.contain('ok 9 Chrome 65.0 - Alex.js: helpers/start-app.js should pass Alex.js')
        .to.contain('ok 10 Chrome 65.0 - Alex.js: index.html should pass Alex.js')
        .to.contain('ok 11 Chrome 65.0 - Alex.js: resolver.js should pass Alex.js')
        .to.contain('ok 12 Chrome 65.0 - Alex.js: router.js should pass Alex.js')
        .to.contain('ok 13 Chrome 65.0 - Alex.js: test-helper.js should pass Alex.js');
        // .to.contain('not ok 11 PhantomJS 2.1 - ESLint | unused.js: should pass ESLint');
    })
  });
});

function emberTest() {
  return new Promise(function(resolve) {
    exec('node_modules\\.bin\\ember test', { cwd: __dirname + '/..', env: process.env }, function (error, stdout, stderr) {
      console.log(stdout);
      console.log(error);
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
