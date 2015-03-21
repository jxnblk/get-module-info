
var mocha = require('mocha');
var assert = require('assert');

var getModuleInfo = require('..');

var postcssInfo = getModuleInfo('postcss');
var basscssGridInfo = getModuleInfo('basscss-grid');


describe('get-module-info', function() {

  it('should be an object', function() {
    assert(typeof postcssInfo, 'object');
  });

  it('should have a name', function() {
    assert(typeof postcssInfo.name, 'string');
  });

  it('should have a version', function() {
    assert(typeof postcssInfo.version, 'string');
  });

  it('should have a title', function() {
    assert(typeof postcssInfo.title, 'string');
  });

  it('should have a readme', function() {
    assert(typeof postcssInfo.readme, 'string');
  });

  it('should get css', function() {
    assert(typeof basscssGridInfo.css, 'string');
  });

  it('should get css stats', function() {
    assert(typeof basscssGridInfo.stats, 'object');
  });

});

