/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> A firts class decorator

function Logger(constructor: Function){
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class  Person00{
    name = 'Max';

    constructor(){
        console.log('Creating person object...');
    }
}

const pers = new Person00();
console.log(pers);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Decorator Factory

function Logger2(career:string){
    console.log("FACTORY 1");
    return function(constructor:Function){
        console.log(career);
        console.log(constructor);
    }
}

@Logger2('Doctor')
class  Person2{
    name = 'Max';

    constructor(){
        console.log('Creating person object...');
    }
}

const pers1 = new Person2();
console.log(pers1);
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> More useful Decorator

function WithTemplate(template:string,hookId:string){
    console.log("FACTORY 2");
    return function(constructor:any){
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if(hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}
@Logger2('Engineering')
@WithTemplate('<h1>My Person Object</h1>','app')
class  Person12{
    name = 'Pedro';

    constructor(){
        console.log('Creating person object...');
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Diving into decorators properties.

function Log(target:any, propertyName: string | Symbol){
    console.log("👉 Property decorator!");
    console.log(target,propertyName);
}

function Log2(target:any,name:string, descriptor: PropertyDescriptor){
    console.log('👉 Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target:any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log('👉 Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target:any, name:string | Symbol, position: number){
    console.log('👉 Parameter Decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product{
    //Decorator to a property
    @Log
    title:  string;
    private _price: number;

    //Decorator to a accessor
    @Log2
    set price(val:number){
        if(val>0){
            this._price = val;
        }else{
            throw new Error('Invalid price should be positive!')
        }
    }

    constructor(t:string,p:number){
        this.title = t;
        this._price = p;
    }

    //Decorator to a method
    @Log3
    getPriceWithTax(@Log4 tax:number){
        return this._price * (1 + tax);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Returning (and changing) a Class in a Class Decorator

function WithTemplate2(template:string,hookId:string){
    console.log("FACTORY 3");
    return function<T extends { new ( ...args : any[] ) : { name : string } }>(originalConstructor:T){
        return class extends originalConstructor {
            constructor(...args:any[]){
                super();
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@WithTemplate2('<h1>My Person Object</h1>','app')
class  PersonWith{
    name = 'Juan';

    constructor(){
        console.log('Creating person object...');
    }
}

const pers4 = new  PersonWith();
/////////////////////////////////////////////////////////////////////////////////////////////////
//|==>  Example: Creating an "Autobind" Decorator

function Autobind(_:any,_2:string,descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable:true,
        enumerable:false,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }

    return adjDescriptor;
}

class Printer{
    message = 'This works 🔺';

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}
const p = new Printer();
const button = document.querySelector('button')!;
//Without decorator.
// button.addEventListener('click',p.showMessage.bind(this));
button.addEventListener('click',p.showMessage);

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==>  Validation with Decorators - First Steps

interface  validateConfig{
    [property:string]:{
        [validatableProp:string]:string[]//['required','positive']
    }
}

const registeredValidators: validateConfig = {};

function Required(target:any,propName:string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PositiveNumber(target:any,propName:string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]:[...(registeredValidators[target.constructor.name]?.[propName] ?? []),'positive']
    }
}

function validate(obj:any){
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for(const prop in objValidatorConfig){
         console.log(prop);
        for(const validator of objValidatorConfig[prop]){
            switch(validator){
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

class Course{
    @Required
    title:string;
    @PositiveNumber
    price:number;
    constructor(t:string,p:number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('#form');
courseForm?.addEventListener('submit',event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;
    console.log(price);
    
    const createCourse = new Course(title,price);

    if(!validate(createCourse)){
        alert('Invalid input, please try again!');
        return;
    }
    console.log(registeredValidators);
    console.log(createCourse);
})