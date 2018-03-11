/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-alex',

  init() {
    console.log('init!!!!');
  },

  included: function(app) {
    console.log('included!!!!!!');
  },

  lintTree: function(type, tree) {
    console.log('heyyyyyyyyy');
    console.log(type);
  }
};
