"use strict";
var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};
////////////////////////////////////////////////////////////
//
//|==> More on Type Guards
function add(input1, input2) {
    //NOTE: This is colled type guard
    if (typeof input1 === 'string' || typeof input2 === 'string') {
        return input1.toString() + input2.toString();
    }
    return input1 + input2;
}
function printEmployeeInformation(emp) {
    console.log(`Name : ${emp.name}`);
    if ('privileges' in emp) {
        console.log(`Privalages: ${emp.privileges}`);
    }
    if ('startDate' in emp) {
        console.log(`Date: ${emp.startDate}`);
    }
}
//printEmployeeInformation(e1);
printEmployeeInformation({
    name: 'Manu',
    startDate: new Date,
});
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving...');
    }
    loadCargo(amount) {
        console.log('Loading Cargo...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle){
    //     vehicle.loadCargo(1000);
    // }
    //NOTE: This works because is this part of vanilla js, it allow us to see if the object cames from an instace of the class that we specified.
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving at speed: ${speed}`);
}
moveAnimal({ type: 'bird', flyingSpeed: 20 });
////////////////////////////////////////////////////////////
//|==> Type Casting
//NOTE: Typescript doesn't know what Html elements exists in the doom.
//This syntax is mostly use in React.
// const userInputElement = <HTMLInputElement> document.querySelector('user-input');
//This is most common in other projects. Here we are forcing the type. '!' this symbol is telling that the expression will never yield null.
// const userInputElement = document.querySelector('#user-input')! as HTMLInputElement;
// userInputElement.value = 'Hi there';
const userInputElement = document.querySelector('#user-input');
if (userInputElement) {
    userInputElement.value = 'Hi there';
}
const errorBag = {
    email: 'Not a valid email',
    username: 'Most start with a capital character'
};
function operationAdd(input1, input2) {
    //NOTE: This is colled type guard
    if (typeof input1 === 'string' || typeof input2 === 'string') {
        return input1.toString() + ' ' + input2.toString();
    }
    return input1 + input2;
}
const resultOp = operationAdd(23, '23');
console.log(resultOp);
////////////////////////////////////////////////////////////
//|==> Optional chaining
const fetchUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
console.log((_a = fetchUserData === null || fetchUserData === void 0 ? void 0 : fetchUserData.job) === null || _a === void 0 ? void 0 : _a.title);
