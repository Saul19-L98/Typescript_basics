//NOTE: Interface: it allows us to define the structure of an object.
interface Named{
    // readonly name:string;
    name?:string;
    age?:number;
}

//NOTE: Interfaces can extend from multiple interfaces.
interface Greetable extends Named{
    greet(phrase:string): void;
}

class Person implements Greetable{
    name?: string;
    age?: number;
    constructor(n?:string, a?: number){
        this.name = n;
        this.age  = a;
    }

    greet(phrase: string): void {
        if(this.name){
            console.log(phrase + ' ' + this.name)
        }else{
            console.log('Sorry, there is no name')
        }
    }
} 

let user1: Greetable;

user1 = {
    name:'Max',
    age: 24,
    greet(phrase:string){
        console.log(phrase + ' ' + this.name);
    }
}

user1.greet('Hi there, I am: ');
user1.name = 'Helo';

const  person1 = new Person();
const  person2 = new Person('Max',23);
person1.greet('Welcome, comarade ');
person2.greet('Welcome, comarade')