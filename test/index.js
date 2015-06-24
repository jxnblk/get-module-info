
var mocha = require('mocha');
var assert = require('assert');

var getModuleInfo = require('..');

var postcssInfo = getModuleInfo('postcss');
var basscssGridInfo = getModuleInfo('basscss-grid', { ast: false });


describe('get-module-info', function() {

  it('should be an object', function() {
    assert.equal(typeof postcssInfo, 'object');
  });

  it('should have a name', function() {
    assert.equal(typeof postcssInfo.name, 'string');
  });

  it('should have a version', function() {
    assert.equal(typeof postcssInfo.version, 'string');
  });

  it('should have a title', function() {
    assert.equal(typeof postcssInfo.title, 'string');
  });

  it('should have a readme', function() {
    assert.equal(typeof postcssInfo.readme, 'string');
  });

  it('should get css', function() {
    assert.equal(typeof basscssGridInfo.css, 'string');
  });

  it('should get css stats', function() {
    assert.equal(typeof basscssGridInfo.stats, 'object');
  });

  it('should allow optional results', function() {
    assert.equal(typeof basscssGridInfo.ast, 'undefined');
  });

});
