"use strict";
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Build  Generics (help you with the data that you wnat to store or return)
// Array<string> is the same as string[]
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});
promise.then((data) => {
    data.split(' ');
});
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Creating  Generics
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
//console.log(merge({name:'Max'},{age:23}));
const mergedObj = merge({ name: 'Max', hobbies: ['Swimming', 'Football'] }, { age: 23 });
console.log(mergedObj);
console.log(mergedObj.name);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Working with constrains.
function merge2(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj2 = merge({ name: 'Sam', hobbies: ['Swimming', 'Football'] }, { subject: 'admin' });
console.log(mergedObj2);
function countAndPrint(element) {
    let description = 'Got no value.';
    if (element.length === 1) {
        description = 'Got 1 element.';
    }
    else if (element.length > 1) {
        description = 'Got ' + element.length + ' element.';
    }
    return [element, description];
}
console.log(countAndPrint('Hi there'));
console.log(countAndPrint(['cook', 'spoon']));
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> The "keyof" Constraint.
function extractAndConvert(obj, key) {
    return `Value: ${obj[key]}`;
}
console.log(extractAndConvert({ name: 'Max' }, 'name'));
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Generic classes.
//Only works with primity values
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removedItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Max');
textStorage.addItem('Sam');
textStorage.removedItem('Max');
console.log(textStorage.getItems());
const NumberStorage = new DataStorage();
NumberStorage.addItem(23);
NumberStorage.addItem(25);
console.log(NumberStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.descrption = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const exampleNames = ['Max', 'Ana'];
// exampleNames.push('Sam');
// exampleNames.pop();
