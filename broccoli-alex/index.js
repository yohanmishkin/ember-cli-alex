
var Filter = require('broccoli-filter');
var broccoliNodeInfo = require('broccoli-node-info');
var alex = require('alex');

class Alex extends Filter {
  constructor(templatesPath, options) {
    super(templatesPath);

    this.options = options || {};
  }

  processString(content, relativePath) {
    let messages = alex(content).messages;
    this.options.onComplete(messages);
  }
}

module.exports = Alex;