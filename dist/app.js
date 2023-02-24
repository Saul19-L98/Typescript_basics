"use strict";
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> A firts class decorator
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
let Person00 = class Person00 {
    constructor() {
        this.name = 'Max';
        console.log('Creating person object...');
    }
};
Person00 = __decorate([
    Logger
], Person00);
const pers = new Person00();
console.log(pers);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Decorator Factory
function Logger2(career) {
    console.log("FACTORY 1");
    return function (constructor) {
        console.log(career);
        console.log(constructor);
    };
}
let Person2 = class Person2 {
    constructor() {
        this.name = 'Max';
        console.log('Creating person object...');
    }
};
Person2 = __decorate([
    Logger2('Doctor')
], Person2);
const pers1 = new Person2();
console.log(pers1);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> More useful Decorator
function WithTemplate(template, hookId) {
    console.log("FACTORY 2");
    return function (constructor) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
let Person12 = class Person12 {
    constructor() {
        this.name = 'Pedro';
        console.log('Creating person object...');
    }
};
Person12 = __decorate([
    Logger2('Engineering'),
    WithTemplate('<h1>My Person Object</h1>', 'app')
], Person12);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Diving into decorators properties.
function Log(target, propertyName) {
    console.log("👉 Property decorator!");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log('👉 Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('👉 Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('👉 Parameter Decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    //Decorator to a accessor
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price should be positive!');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    //Decorator to a method
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Returning (and changing) a Class in a Class Decorator
function WithTemplate2(template, hookId) {
    console.log("FACTORY 3");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(...args) {
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let PersonWith = class PersonWith {
    constructor() {
        this.name = 'Juan';
        console.log('Creating person object...');
    }
};
PersonWith = __decorate([
    WithTemplate2('<h1>My Person Object</h1>', 'app')
], PersonWith);
const pers4 = new PersonWith();
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==>  Example: Creating an "Autobind" Decorator
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works 🔺';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
//Without decorator.
// button.addEventListener('click',p.showMessage.bind(this));
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('#form');
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    console.log(price);
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(registeredValidators);
    console.log(createCourse);
});
