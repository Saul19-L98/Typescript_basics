/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Build  Generics (help you with the data that you wnat to store or return)

// Array<string> is the same as string[]
const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('This is done');
    },2000)
});

promise.then((data)=>{
    data.split(' ');
})

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Creating  Generics
function merge<T extends Object ,U> ( objA:T, objB:U){
    return Object.assign(objA,objB);
}

//console.log(merge({name:'Max'},{age:23}));

const mergedObj = merge({name:'Max',hobbies:['Swimming','Football']},{age:23}); 
console.log(mergedObj);

console.log(mergedObj.name);

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Working with constrains.

function merge2<T extends object ,U extends object> ( objA:T, objB:U){
    return Object.assign(objA,objB);
}

const mergedObj2 = merge({name:'Sam',hobbies:['Swimming','Football']},{subject:'admin'}); 
console.log(mergedObj2);

interface Lengthy{
    length: number;
}

function countAndPrint<T extends Lengthy>( element:T ):[T,string]{
    let description = 'Got no value.';
    if(element.length === 1){
        description = 'Got 1 element.';
    } else if(element.length > 1){
        description = 'Got ' + element.length + ' element.';
    }
    return [element,description];
}

console.log(countAndPrint('Hi there'));
console.log(countAndPrint(['cook','spoon']));

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> The "keyof" Constraint.

function extractAndConvert<T extends object, U extends keyof T>( obj:T, key:U){
    return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({name:'Max'},'name'));

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Generic classes.

//Only works with primity values
class DataStorage<T extends string | number | boolean> {
    private data: Array<T> = [];

    addItem(item:T){
        this.data.push(item);
    }

    removedItem(item:T){
        this.data.splice(this.data.indexOf(item),1)
    }

    getItems(){
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Sam');
textStorage.removedItem('Max');
console.log(textStorage.getItems());

const NumberStorage = new DataStorage<number>();
NumberStorage.addItem(23);
NumberStorage.addItem(25);
console.log(NumberStorage.getItems());

/////////////////////////////////////////////////////////////////////////////////////////////////
//|==> Generic Utility Types (Partial & Readonly)

interface CourseGoal{
    title: string;
    descrption: string;
    completeUntil:Date;
}

function createCourseGoal(
    title:string,
    description:string,
    date:Date,
):CourseGoal{
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.descrption = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

const exampleNames: Readonly<string[]> = ['Max','Ana'];
// exampleNames.push('Sam');
// exampleNames.pop();