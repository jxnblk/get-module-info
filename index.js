
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var postcss = require('postcss');
var postcssImport = require('postcss-import');
var cssstats = require('cssstats');


// Postcss plugin to remove :root rules, @custom-media declarations, and comments
var cleanDisplay = postcss.plugin('clean-display', function (opts) {
  opts = opts || {};
  return function (css) {
    css.eachRule(function(rule) {
      if (rule.selector === ':root') {
        rule.removeSelf();
      }
    });
    css.eachAtRule(function(atRule) {
      if (atRule.name === 'custom-media') {
        atRule.removeSelf();
      }
    });
    css.eachComment(function(comment) {
      comment.removeSelf();
    });
  };
});

module.exports = function(name, options) {

  var options = options || {};
  var options = _.defaults(options, {
    name: false,
    dirname: '.',
    ast: true,
    css: true,
    cleanCss: true,
    stats: true
  });
  var results = {};
  var filepath;
  var processor = postcss();

  if (!name || typeof name !== 'string') {
    console.error('Module name is required and must be a string');
    return false;
  }

  filepath = options.dirname + '/node_modules/' + name;

  function parseStyle(style) {
    var src = fs.readFileSync(filepath + '/' + style, 'utf8');
    var ast = processor
      .use(postcssImport())
      .process(src, { from: filepath + '/' + style });
    return ast;
  }

  results = require(filepath + '/package.json') || false;
  if (fs.existsSync(filepath + '/README.md')) {
    results.readme = fs.readFileSync(filepath + '/README.md', 'utf8');
  } else {
    console.log('README.md not found for ' + name);
  }

  var style = results.style || fs.existsSync(filepath + '/index.css') ? 'index.css' : false;
  if (style) {
    var ast = parseStyle(style);
    var css = ast.css;
    if (options.ast) { results.ast = ast; }
    if (options.css) { results.css = css; }
    if (options.cleanCss) { results.cleanCss = postcss().use(cleanDisplay()).process(css).css; }
    if (options.stats) { results.stats = cssstats(css); }
  }

  results.title = _.capitalize(results.name);
  results.npm_link = '//npmjs.com/package/' + name;

  return results;

};
