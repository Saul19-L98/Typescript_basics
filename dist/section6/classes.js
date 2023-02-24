"use strict";
//IMPORTANT: An abstract class no longer can  be instantiated
class Department {
    //NOTE: 'readonly' ensures that the property is only initialize once and it shouldn't change.
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    // describe(this:Department){
    //     console.log(`Department (${this.id}): ${this.name}`)
    // }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
//NOTE: This way of initialize our class takes to many time to write.
// private id: string;
// private name: string;
// private employees:string[] = [];
// constructor(id:string, n:string){
//     this.name = n;
//     this.id = id;
// }
//NOTE: This is a better way to initialize or class.
//private employees:string[] = [];
Department.fiscalYear = 2022;
class ItDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
        this.admins = admins;
    }
    //From abstract method of Department
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, 'RE');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    //From abstract method of Department
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const it = new ItDepartment('1df', ['AccountingIT']);
// console.log(accounting);
//it.describe();
it.addEmployee('Max');
it.addEmployee('Fer');
it.addEmployee('Laura');
it.name = 'NEW NAME';
console.log(it);
//NOTE: Error: with 'private' word added to the biginning of the name of the property, that property now can only be modified within the class itselft. 
// accounting.employees[3] = 'Anna';
it.printEmployeeInformation();
//|==> Example, of  using the 'this' key word to bind the constructor parameter of the father class to this child object. (This works only if the father class contains only the property of 'name')
// const accountingCopy = {name:'Max', describe:accounting.describe};
// accountingCopy.describe();
const accounting = new AccountingDepartment('AD1', []);
accounting.mostRecentReport = 'The system failed';
accounting.addReport('All is working correctly');
console.log(accounting.mostRecentReport);
accounting.addReport('Nothing is wrong...');
accounting.printReports();
accounting.addEmployee('Max');
accounting.addEmployee('Will');
accounting.addEmployee('Dog');
accounting.printEmployeeInformation();
const employee1 = Department.createEmployee('Sam');
console.log(employee1);
accounting.describe();
it.describe();
