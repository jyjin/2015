function Person(familyName) {

  return (function() {

    familyName = familyName || 'King';

    var age; //private

    function dressMe(name) {
      console.log(name + ' can dress somebody beautiful...');
    };

    function Person(name, _age) {

      this.name = name + '·' + familyName;
      age = _age;

      this.program = function() {
        console.log(name + ' can programming...');
      }

      this.skill = function() {
        return dressMe(name);
      }
    }

    return Person;

  })(familyName)
}

function forn(n, callback) {
  for (var i = 0; i < n; i++) {
    callback(i,arguments);
  }
}

function ford(n, callback) {
  for (var i = n; i > 0; i--){
    callback(i,arguments);
  }
}

document.ready(function() {
  console.log('ready bg:' + document.getElementById('inp').value);
  forn(10, function(i) {
    console.log(i);
  })
});