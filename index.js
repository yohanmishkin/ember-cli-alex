'use strict';

module.exports = {
  name: 'ember-cli-alex',

  init() {
    this._super.init && this._super.init.apply(this, arguments);
  },

  lintTree: function(type, tree) {
    console.log(tree);
  }
};
