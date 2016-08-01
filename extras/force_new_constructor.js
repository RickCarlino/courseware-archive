function Person(name) {
    if (!(this instanceof Person)) {
        return new Person(name);
    }
    this.name = name;
}

var ok = new Person("Rick");
var okAlso = Person("John");
