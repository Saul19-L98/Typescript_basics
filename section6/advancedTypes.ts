////////////////////////////////////////////////////////////
//|==> Interception types.
type Admin = {
    name:string;
    privileges:string[];
};

type Employee = {
    name:string;
    startDate: Date;
};

//Combined types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name:'Max',
    privileges: ['create-server'],
    startDate: new Date(),
}
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

////////////////////////////////////////////////////////////
//
//|==> More on Type Guards
function add(input1:Combinable,input2:Combinable){
    //NOTE: This is colled type guard
    if(typeof input1 === 'string' || typeof input2 === 'string' ){
        return input1.toString() + input2.toString();
    }
    return input1 + input2;
}

type UnknowEmployee = Employee | Admin;

function printEmployeeInformation(emp:UnknowEmployee){
    console.log(`Name : ${emp.name}`);
    if('privileges' in emp){
        console.log(`Privalages: ${emp.privileges}`)
    }
    if('startDate' in emp){
        console.log(`Date: ${emp.startDate}`)
    }
}

//printEmployeeInformation(e1);
printEmployeeInformation({
    name:'Manu',
    startDate: new Date,
});

class Car {
    drive (){
        console.log('Driving...');
    }
}

class Truck {
    drive (){
        console.log('Driving...');
    }
    loadCargo(amount:number){
        console.log('Loading Cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle:Vehicle){
    vehicle.drive();
    // if('loadCargo' in vehicle){
    //     vehicle.loadCargo(1000);
    // }
    //NOTE: This works because is this part of vanilla js, it allow us to see if the object cames from an instace of the class that we specified.
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);
////////////////////////////////////////////////////////////
//|==> Descriminated Unions (Useful when working with objects and union types)

interface Bird{
    //NOTE: This is an literal type (custom type);
    type: 'bird';
    flyingSpeed: number;
}

interface Horse{
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal:Animal){
    let speed;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
        break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving at speed: ${speed}`)
}

moveAnimal({type:'bird', flyingSpeed:20})

////////////////////////////////////////////////////////////
//|==> Type Casting


//NOTE: Typescript doesn't know what Html elements exists in the doom.

//This syntax is mostly use in React.
// const userInputElement = <HTMLInputElement> document.querySelector('user-input');

//This is most common in other projects. Here we are forcing the type. '!' this symbol is telling that the expression will never yield null.
// const userInputElement = document.querySelector('#user-input')! as HTMLInputElement;

// userInputElement.value = 'Hi there';

const userInputElement = document.querySelector('#user-input');

if(userInputElement){
    (userInputElement as HTMLInputElement).value = 'Hi there';
}

////////////////////////////////////////////////////////////
//|==> Index Properties (Index Types)

interface ErrorContainer{
    // { email: 'Not a valid email', username: 'Most start with a character'}
    //NOTE: I just know that every property which is addded to this object, which is based on error container, must have a property name which can be interpreted as a string and the value of that proerty must be an string
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Most start with a capital character'
}

////////////////////////////////////////////////////////////
//|==> Functions overloads (way of calling a function with different parameters)
type Combinable1 = string | number;

function operationAdd(a:string,b:number):string
function operationAdd(a:number,b:string):number
function operationAdd(a:string,b:string):string
function operationAdd(a:number,b:number):number
function operationAdd(input1:Combinable1,input2:Combinable1){
    //NOTE: This is colled type guard
    if(typeof input1 === 'string' || typeof input2 === 'string' ){
        return input1.toString() + ' ' + input2.toString();
    }
    return input1 + input2;
}

const resultOp = operationAdd(23,'23');
console.log(resultOp);
////////////////////////////////////////////////////////////
//|==> Optional chaining
const fetchUserData = {
    id: 'u1',
    name: 'Max',
    job:{title: 'CEO', description: 'My own company'}
}
console.log(fetchUserData?.job?.title);