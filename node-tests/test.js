
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
        .to.contain('ok 1 Chrome 65.0 - Alex.js | tests: app.js')
        .to.contain('ok 5 Chrome 65.0 - Alex.js | tests: dummy/templates/application.hbs')
        .to.contain('ok 6 Chrome 65.0 - Alex.js | tests: helpers/destroy-app.js')
        .to.contain('ok 7 Chrome 65.0 - Alex.js | tests: helpers/module-for-acceptance.js')
        .to.contain('ok 8 Chrome 65.0 - Alex.js | tests: helpers/resolver.js')
        .to.contain('ok 9 Chrome 65.0 - Alex.js | tests: helpers/start-app.js')
        .to.contain('ok 10 Chrome 65.0 - Alex.js | tests: index.html')
        .to.contain('ok 11 Chrome 65.0 - Alex.js | tests: resolver.js')
        .to.contain('ok 12 Chrome 65.0 - Alex.js | tests: router.js')
        .to.contain('ok 13 Chrome 65.0 - Alex.js | tests: test-helper.js');
    });
  });

  it('fails if an alex.js test fails', function() {

    fs.outputFileSync(FAILING_FILE, 'He dont care');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 Chrome 65.0 - Alex.js | tests: app.js')
        .to.contain('ok 5 Chrome 65.0 - Alex.js | tests: dummy/templates/application.hbs')
        .to.contain('not ok 6 Chrome 65.0 - Alex.js | tests: dummy/templates/howinsenstive.hbs')
        .to.contain('ok 7 Chrome 65.0 - Alex.js | tests: helpers/destroy-app.js')
        .to.contain('ok 8 Chrome 65.0 - Alex.js | tests: helpers/module-for-acceptance.js')
        .to.contain('ok 9 Chrome 65.0 - Alex.js | tests: helpers/resolver.js')
        .to.contain('ok 10 Chrome 65.0 - Alex.js | tests: helpers/start-app.js')
        .to.contain('ok 11 Chrome 65.0 - Alex.js | tests: index.html')
        .to.contain('ok 12 Chrome 65.0 - Alex.js | tests: resolver.js')
        .to.contain('ok 13 Chrome 65.0 - Alex.js | tests: router.js')
        .to.contain('ok 14 Chrome 65.0 - Alex.js | tests: test-helper.js')
    })
  });
});

function emberTest() {
  return new Promise(function(resolve) {
    exec('ember test', { cwd: __dirname + '/..', env: process.env }, function (error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
