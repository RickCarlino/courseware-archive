# Promises and Asyncronicity

Understanding asynchronous behavior, promises, callbacks and $q in AngularJS

Rick Carlino

---

## Async Behavior in JavaScript

 * JavaScript code is *single threaded by design*.
 * Multitasking is possible via an "event queue"
 * Events are executed "one-at-a-time" in an event queue.
 * The "event loop" checks the queue for events and executes them one at a time.

NOTE: The underlying JavaScript interpreter is not always single threaded, but the interface provided to JavaScript programmers is ALWAYS SINGLE THREADED.

---

## Synchronous (Blocking) Method Call

Synchronous methods like `prompt` will sit and wait for the user to provide data before continuing execution.

```javascript
var name = prompt("What's your name?");
// Does not run until data arrives
console.log("Your name is " + name);
```

Although syncronous APIs are easier to understand at first, they consume a considerable amount of CPU time waiting for data. That CPU time could be used for other things.

For these reasons, ** very few JavaScript APIs operate like this! **

---

## (Incorrect) Async Method Calls

** Scenario: **

You're fetching a [user object](http://jsonplaceholder.typicode.com/users/1) from an API via AJAX.

You're using **`$http`**, the Angular AJAX library.

```javascript
var apiUrl = "//jsonplaceholder.typicode.com/" +
             "users/1";
// AVOID: Invalid code!
var user = $http.get(apiUrl); // <== API Call

console.log("Your name is " + user.data.name);

```

** What's wrong here? **

---

## ...$http Returns a "Promise"

 > A Promise represents an operation that hasn't completed yet, but is expected in the future.

-- [Mozilla Developer Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

** Simple explanation: **

Promise objects wrap around an object that might show up in the future. Alternatively, the event could fail (this is called "rejection").

 * In our last example, the call to $http returned a promise, not data
 * Async method calls almost never return data.

---

## Rejection and Resolution

A promise can either be "resolved" or "rejected".

**Resolve** means "success" (unwraps a response object).

**Reject** means "failure" (unwraps an error object).

Promise objects expose an API to handle both **success** and **failure**.

---

## Promise Object API

Angular promise objects are created with the `$q` service (more later).

```javascript
// Syntax 1
asyncFunctionCall()
  .then(successFn, failureFn);

// Syntax 2
asyncFunctionCall()
  .then(successFn)
  .catch(failureFn);
```

**Any function that returns a promise (even native JavaScript functions) will use this API!**

More and more JavaScript APIs are standardizing on this syntax.

---

## Fixed $http Example

```javascript

var apiUrl = "//jsonplaceholder.typicode.com/" +
             "users/1";

$http.get(apiUrl).then(function(resp){
  console.log("Your name is " + resp.data.name);
});

console.log("I'm waiting...");
```

Console output:

1. "I'm waiting..."
2. "Your name is Mary Smith"

**Why did the lines print out of order?**

---

## Another Common Pitfall

**PROBLEM: ** Calling the data before its ready

```javascript
var username;

$http.get(apiUrl).then(function(resp){
  userName = resp.data.name
});
// AVOID: Race condition
console.log(username);

```

Can you see the problem here?

---

## Why Not Use Callbacks?

Promises prevent the "Pyramid of Doom"

```javascript
fs.readdir(source, function(err, files) {
  if (err) {
    // Handle Error
  } else {
    files.forEach(function(filename, fileIndex) {
        // Handle each element
        gm(source + filename).size(function(err, values) {
            if (err) {
              // Handle error(s)
            } else {
              // Handle success(es)
            })
        }
      }
    })
  })
```

---

## Promises are "Flat"

```javascript
// Logic like this is hard to maintain with simple callbacks.
  UserLib.createLogin({email: "rick@rick.com"})
    .then(function(token) { return UserLib.login(token); })
    .then(function(user) { return UserLib.visitProfile(user); })
    .catch(function(err) { return UserLib.errorReporter(err); })

```

```javascript
// Factored down even more...
  UserLib.createLogin({email: "rick@rick.com"})
    .then(UserLib.login)
    .then(UserLib.visitProfile)
    .catch(UserLib.errorReporter)

```

Promises are a cleaner, standards compliant alternative to raw callbacks.

---

## Under the Hood: $q

How do the authors of promise based libraries (like `$http`) control execution of `.then` and `.catch` blocks?

The answer lies in Angular's `$q` library.

Previously, we learned how to *use* promise based APIs. Now, let's learn how to *implement* a promise based API.

This is useful for any asynchronous operation (eg: form validation).

---

## When Will I Write Promise Based APIs?

 * When dealing with legacy code that doesn't implement promise based APIs.
 * When modernizing legacy callback-based libraries.
 * When using technologies other than AJAX.
   * Example: You are working with raw WebSocket objects.
 * When writing custom validation code (Eg: username availability validation).

---

## $q Example

Scenario: You're writing an Angular library. You want to provide developers a clean `.then` / `.catch` syntax when using the library.

Solution: Create a "deferred object" to control when a promise will fire.

```javascript
var deferred = $q.defer(); // Occurs in the future
var salesOrder = deferred.promise; // Promise is "wrapped" by deferred object.

// Won't execute until the deferred object is rejected / resolved.
salesOrder.then(function(order){
    // Update inventory / bookkeeping system...
  })
  .catch(function(error){
    // Notify credit agencies...
  });

```
This will set up a "deferred" object. But how do we fire a `.catch`/`.then` block?

---

## Resolution and Rejection

When an asynchronous operation completes, the *creator of the deferred object* is responsible for resolving or rejecting the promise, based on outcome.

This is how all promise based libraries operate internally. This technique is essential for implementing promise-based behavior.

```javascript
// This code would happen INTERNALLY within a promise based library.
var order = {orderNum: 123, confirmationCode: 456};

//SCENARIO 1: Order completes
salesOrder.resolve(order); // Pass order to pending .then() calls.

//SCENARIO 2: Order failed
salesOrder.reject("reason"); // Pass "reason" to pending .catch() calls.
```

Any value can be passed to `resolve` and `reject`. This value will be passed to all relevant `.then` or `.catch` calls.

---

## $q.when()

**Scenario:** You are using a 3rd party API that expects a promise object as an input. You wish to pass a raw value (object, string, etc..) instead of a promise.

Usually this means you want to use an asynchronous library in a synchronous manner. Another use case is creating stub promises for unit tests.

**Solution:** Wrap the raw value in a promise using `$q.when()`.

```javascript
var myRawValue = {userId: 4, name: "Rick"};
var promiseWrapedObject = $q.when(myRawValue);

promiseWrapedObject
  .then(function(result){
    result // => {userId: 4, name: "Rick"}
  });
```

---

## Questions?

### Further Reading

 * A+ promise spec: https://promisesaplus.com/
 * MDN Promise Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
---
