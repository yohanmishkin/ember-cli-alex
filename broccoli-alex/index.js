
var Filter = require('broccoli-filter');
var broccoliNodeInfo = require('broccoli-node-info');
var alex = require('alex');

class Alex extends Filter {
  constructor(templatesPath, options) {
    super(templatesPath);

    if (options.onComplete) {
      this.onComplete = options.onComplete;
    }
  }

  processString(content, relativePath) {
    let messages = alex(content).messages;
    this.onComplete(messages);
  }

  onComplete(messages) {
    console.log('hiya from onComplete!');
  }
}

module.exports = Alex;