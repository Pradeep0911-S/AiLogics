let city : string = "hyderabad";
let salary : number = 25000;
let isemployeed : boolean = true;

console.log(city,salary,isemployeed);

let age : number = 25;

age = 30;
console.log(age);

let first : any = "hello";
let second : unknown = "hello";

if(typeof second === "string"){
    console.log(first.toUpperCase(),second.toUpperCase());
}

console.log(first.toUpperCase(),second.toUpperCase());

let skills : string[] = ["javascript","node.js","typescript"];
console.log(skills);
 
skills.push("express");
console.log(skills);

let product : {
    name : string,
    price : number,
    inStock : boolean
} = {
    name : "book",
    price : 300,
    inStock : true 
}

product.price = 500;

type product = {
    name : string,
    price : number,
    inStock : boolean
}

let product1 : product = {
    name : "book",
    price : 300,
    inStock : true
}

let product2 : product = {
    name : "Phone",
    price : 10300,
    inStock : false
}

console.log(product1,product2);


interface Employee {
    name : string;
    salary : number;
    isFullTime : boolean
}

let employee1 : Employee = {
    name : "pradeep",
    salary : 15000,
    isFullTime : false
}
console.log(employee1);

interface Person {
    name : string
}
interface Student extends Person {
    marks : number
}

let student1 : Student = {
    name : "Pradeep",
    marks : 85
}

let status : string | number;

status = "sucess";
console.log(status);
status = 200;

console.log(status);

type Product  = {
    status : string | number,
    isShipped : boolean
}

let product1 : Product = {
    status : 50,
    isShipped : true
}

let product2 : Product = {
    status :  "yes",
    isShipped : true
}

console.log(product1,product2);


function multiply(a:number , b : number) : number{
    return a*b
}

console.log(multiply(5, 4));

function calculateTotal(price:number , quantity? : number) : number {
    if (quantity){
        return  quantity*price;
    }
    else {
        return 1 * price;
    }
}

function calculateTotal(price: number, quantity: number = 1): number {
    return price * quantity;
}



console.log(calculateTotal(100));  
console.log(calculateTotal(100, 3)); 

function isEven(n:number) : boolean {
    return n%2 == 0 ? true : false
}

console.log(isEven(20));

function printLength(value: string | number) : number{
    return typeof value === "string" ? value.length :  value * 2;
}

console.log(printLength(3));
console.log(printLength("hello"));

function getDiscount(price:number) : number {
    return price >= 1000 ? (10/100) * price : 0
}

console.log(getDiscount(2000));

console.log(getDiscount(20));

function calculateBill(price: number, quantity: number = 1): number {
    return price * quantity;
}

console.log(calculateBill(500));    // 500
console.log(calculateBill(500, 3)); // 1500

function greetUser(name: string, greeting: string = ""): string {
    return greeting === "" ? `Hello ,${name}` :  `${greeting},${name}`;
}

console.log(greetUser("Rahul"));
// Hello, Rahul!

console.log(greetUser("Rahul", "Good morning"));
Good morning, Rahul!

function formatValue(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else {
        return value * 10;
    }
}
console.log(formatValue("hello")); // HELLO
console.log(formatValue(5));       // 50

function getLength(value: string | number): number {
    if (typeof value === "string") {
        return value.length;
    } else {
        return 0;
    }
}

console.log(getLength("TypeScript")); // 10
console.log(getLength(123));         // 0


function processInput(value: string | number | boolean) :string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else if (typeof value === "number") {
        return value * 2;
    } else {
        return value ? "Yes" : "No"
    }
}

console.log(processInput("hello")); // HELLO
console.log(processInput(10));      // 20
console.log(processInput(true));    // Yes
console.log(processInput(false));   // No


function describeValue(value: string | number | null) : string | number{
    if(typeof value === "string"){
        return value.length
    }
    else if(typeof value === "number"){
        return value * 7 ;
    }
    else{
        return "No Value"
    }
}
console.log(describeValue(null));    // No value
console.log(describeValue("hello")); // 5
console.log(describeValue(10));      // 20

function calculatePrice(price : number , discount : number = 0 ): number{
    return discount > 0 ? price - discount : price;
}
console.log(calculatePrice(100));     // 100
console.log(calculatePrice(100, 20)); // 80

let scores: number[] = [100, 200, 300];

scores.push(400);    // Allowed
scores.push("100"); // Type error

let names: string[] = ["Rahul", "Priya", "Amit"]
names.push("Sneha")

console.log(names[1]);

let marks : number[] = [70, 85, 90, 60]
for(const mark in marks){
    console.log(mark);
}

let mark: number[] = [70, 85, 90, 60];

for (const marks of mark) {
    console.log(marks);
}

let marks : number[] = [70, 85, 90, 60]
let sum : number = 0;
for(let mark of marks){
    sum = sum + mark;
}
console.log(sum);

function findLargest(marks: number[]): number {
    if (marks.length === 0) {
        return 0;
    }

    let max: number = marks[0] ?? 0;

    for (const mark of marks) {
        if (mark > max) {
            max = mark;
        }
    }

    return max;
}

console.log(findLargest([10, 45, 20, 80, 30])); 

let prices: number[] = [10, 20, 30, 40];

let doubled = prices.map(num => num + 5);

console.log(doubled); 

let prices: number[] = [12, 25, 8, 40, 17, 50];
let doubled = prices.filter(num => num >20);

console.log(doubled); 


let prices: number[] = [100, 200, 300, 400];
let totalprice = prices.reduce((sum,num)=>sum+num,0)
console.log(totalprice);

let numbers: number[] = [5, 12, 8, 20, 3, 15];
let final =numbers.filter(num => num>10).map(num=>num*2);
console.log(final);

let product: [string, number, boolean] = ["Laptop", 50000, true];
console.log(product);
console.log(product[1]);

let employee: [string, number] = ["Rahul", 25000];
employee[0]="Pradeep";
employee[1]=30000;
console.log(employee);


class Employee{
    name:string;
    salary:number;
    constructor(name:string,salary:number){
        this.name = name;
        this.salary = salary
    }
    showDetails():string{
        return `${this.name},${this.salary}`
    }
}
const emp1 = new Employee("pradeep",50000);
console.log(emp1.showDetails());


class Employee{
    name:string;
    private salary:number;
    constructor(name:string,salary:number){
        this.name = name;
        this.salary = salary
    }
    getSalary():number {
        return this.salary;
    }
}
const emp1 = new Employee("pradeep",50000);
console.log(emp1.getSalary());




function getNumber(value: number): number {
    return value;
}

function getString(value: string): string {
    return value;
}

function identity<T>(value: T): T {
    return value;
}


console.log(identity<number>(10));
console.log(identity<string>("Hello"));


function getNumber(value: number[]): number {
    return value[0] ?? 0;
}

function getString(value: string[]): string {
    return value[0] ?? "";
}

function getFirst<T>(value: T[]): T | undefined {
    return value[0];
}


console.log(getFirst([10, 20, 30])); 
console.log(getFirst(["Ram", "Rahul"]));

function getFirst<T>(value: T[]): T | undefined {
    return value[0];
}

console.log(getFirst([10, 20, 30]));       // 10
console.log(getFirst(["Ram", "Rahul"]));   // Ram


function getProperty<T>(obj: T, key: keyof T) {
    return obj[key];
}

const user = {
    name: "Pradeep",
    age: 22
};

console.log(getProperty(user, "name")); // Pradeep
console.log(getProperty(user, "age"));  // 22


