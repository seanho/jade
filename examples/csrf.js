

/**
 * Module dependencies.
 */

var jade = require('../'),
    Compiler = jade.Compiler,
    nodes = jade.nodes;

var CSRF = function CSRF(node, options) {
  Compiler.call(this, node, options);
}

CSRF.prototype = Object.create(Compiler.prototype);

CSRF.prototype.visitTag = function(node){
  var parent = Compiler.prototype.visitTag;
  if (node.name === 'form') {
    for (var i = 0; i < node.attrs.length; i++) {
      var attr = node.attrs[i];
      if (attr && attr.name === 'method' && attr.val === "'post'") {
        var tok = new nodes.Tag('input');
        tok.setAttribute('type', '"hidden"', true);
        tok.setAttribute('name', '"csrf"', true);
        tok.setAttribute('value', 'csrf', false);
        node.block.unshift(tok);
      }
    }
  }
  parent.call(this, node);
};

var options = {
  compiler: CSRF
, client: true
}
var locals = {
  csrf: 'WAHOOOOOO'
};

var fn = jade.compileFile(__dirname + '/csrf.jade', options);
console.log(fn(locals));
