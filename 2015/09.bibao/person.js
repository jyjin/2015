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

function for() {
  for (var i = 0; i < n; i++) {
    arguments.callback();
  }
}