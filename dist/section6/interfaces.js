"use strict";
class Person {
    constructor(n, a) {
        this.name = n;
        this.age = a;
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log('Sorry, there is no name');
        }
    }
}
let user1;
user1 = {
    name: 'Max',
    age: 24,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet('Hi there, I am: ');
user1.name = 'Helo';
const person1 = new Person();
const person2 = new Person('Max', 23);
person1.greet('Welcome, comarade ');
person2.greet('Welcome, comarade');
