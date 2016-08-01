# TypeScript

A brief introduction to TypeScript

Rick Carlino

---

## What is TypeScript?

 > TypeScript lets you write JavaScript the way you really want to.
 > TypeScript is a typed **superset** of JavaScript that compiles to plain JavaScript.
 > Any browser. Any host. Any OS. Open Source.

 -- http://www.typescriptlang.org/

 * Opensource, maintained by Microsoft
 * Designed by Anders Hejlsberg, creator of C#, Turbo Pascal
 * Heavily influenced by C# and Java
 * TypeScript can run **all vanilla javascript!**
 * Amazing community support! (Stackoverflow questions answered quickly)

---

## Try it in Your Browser

 * This class will show various code samples demonstrating language features
 * Follow along at your workstation using the [TypeScript Playground](http://www.typescriptlang.org/Playground)
 * Alternatively, [www.codepen.io](www.codepen.io) also provides TypeScript support.

http://www.typescriptlang.org/Playground

---

## Types and Annotations

You can annotate types with the following syntax:

```typescript
// Some basic types:
var myNum: number = 1.42;
var myStr: string = "Hello, world!";
var truthy: boolean = true;

// Special case: "any" type.
var anything: any = "Not sure";
    anything = 456;               // <== No type enforcement.

// Special case: Returning "void".
function returnsNothing(): void {
   alert("Hello.");
}

```

 * TypeScript provides types `number`, `string`, `boolean`,  special fourth type called `Any` as well as `void`.
 * Annotation is not always necessary because of type inference.
---

## Interfaces

```typescript

interface inventoryItem {
  stockNum: number;
  partDesc: string;
}

function placeOrder(item: inventoryItem) {
  // . . .
}

var part = {stockNum: 456, partDesc: "Wooden spacer hinge"};

placeOrder(part);

```

 * No compile time artifacts (see compiler output).
 * Any object that conforms to the interface is OK.
 * Results in smaller code than class definitions.
 * Function overloading is possible, but only via arity.

---

## Template Strings

 * ES6 introduces "template strings", as seen previously in languages like CoffeeScript

```typescript
var userName = "Rick";
var txtTemplate = `
  <h1>User: ${ userName }</h1>
`;
document.write(txtTemplate);

```

 * Raw template strings are not sanitized.

---


## Functions

Multiple syntaxes exist for defining a function.

```typescript
function print(message: string): string {
  return message;
}

var print2 = (message: string): string {
  return message;
};

var print3: (message: string) => string;
// Type annotations separated from implementation.
// Compiler still has type information!
print3 = function(msg) { return msg; };

```

---

## Lambdas (Arrow Functions)

```typescript

var add = (lhand: number, rhand: number): number => {
    return lhand + rhand;
};

```

Arrow functions offer more predictable scoping of '`this`' (lexical scoping).

---

## Classes and Inheritance

```typescript
class Pet {
  constructor( public name: string = "A Pet" ){}
  speak(): string { return "The pet says: "; }
}

class Bird extends Pet {
  constructor(name = "Bird") { super(name) }
  speak(): string { return super.speak() + "chirp"; }
}

```

  * `super` is syntactic sugar to access the prototype (`super.speak`)

---

## Implementing an Interface

```typescript
interface Pet {
  speak(): string;
}

class Bird implements Pet {
  speak(): string { return "chirp"; };
}

```

---
## Enumerations

```typescript
// Defining an Enum type
enum PaymentMethod {
   Cash,
   Credit
}

// Assigning an enum value to a variable
var order = PaymentMethod.Credit; // 1
// Using numbers instead of member names.
order === 1; // true

```

In this example, numbers (`0`) and member names (`PaymentMethod.Credit`) can be used interchangeably.

 * Enums are "open ended"- can be changed later on.
 * Possible to change Enum index via `member = 3` in definition.

---

## Tuples

```typescript

var cardData: [string, number];

// Okay
nameNumber = ['Visa', 4111111111111111];

// Error!
nameNumber = ['Amex', '4111111111111111'];

```
---

## Generic Classes and Interfaces

Offers generic types seen in many other strongly typed languages, such as C#.

```typescript

function echo<T>(value: T): T {
    return value;
}

var myGeneric = echo<string>("Example of a generic.");


```

---

## Declaring Array Types

```typescript

var myStrArry1: Array<string> = ["Example"];

```

Alternatively...

```typescript

  var myStrArry1: string[] = ["Example"];

```

 * Compiler output is the same for both

---

## Imports and Exports

#### In `user.ts`:

```typescript
export interface User {
    id: number;
    name: string;
}
```

#### In `app.ts`:

```typescript

import { User } from './user';

var users: User[] = [{id: 1, name: "Rick"}];
```

---

## Decorators

Decorators offer a means of annotating, modifying or mutating a target.


```typescript

@Component({ selector: 'hello-angular' })
@View({ template: `<button>Click Me!</button>` })

class HelloAngular { /* . . . */ }

```

**Decorators are one of the core features seen in Angular 2.** The example above shows how a decorator can be used the annotate a class with meta information and not change its implementation.

---

## Compiler Configuartions

The TypeScript compiler uses a `tsconfig.json` file to manage compile settings.

```json

{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "out": "../../built/local/tsc.js",
    "sourceMap": true
  }
}

```

A full list of options is maintained at the [TypeScript Wiki on Github](https://github.com/Microsoft/TypeScript/wiki/Compiler-Options)

Special mention: `noImplicitAny`, `module`, `sourceMap`

---

## Typings Tool

Not every library you use will support TypeScript.

The "Typings Tool" provides a list of *`TypeScript definition files`* for use with 3rd party JavaScript modules that do not support TypeScript directly.

SEE: https://github.com/typings/typings

Example of adding type definitions for a project that uses JQuery:

```typescript

/// <reference path="jquery/jquery.d.ts" />

```

 * Think of them like header files in C++
 * Not needed for libraries that support typescript directly.

---

## Questions?

---
