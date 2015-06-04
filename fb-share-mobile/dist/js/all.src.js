var Hello;

Hello = (function() {
  function Hello() {}

  Hello.prototype.hello = function() {
    return console.log('Hello Project!');
  };

  return Hello;

})();

var root;

root = new Hello();

root.hello();
