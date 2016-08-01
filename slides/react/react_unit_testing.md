# Test Driven Development

Topics:

 * Jasmine
 * Jasmine Spies
 * Jasmine CLI
 * Karma

Unit testing in React requires a combination of *many* topics.

---

## Forming a Mental Model of Testing

What is a test suite?

   - It's a program that validates the correctness of another program.
   - It makes expectations about a program's output, based on known inputs.

 > "Function `add()` should always return `4` when passed `(2, 2)`.
 > If `add(2, 2)` does not return `4`, something is wrong."

A test suite is just a program that runs your program

It makes sure everything still works the way it should before deployments and after updates.

---

## Smallest Possible Testing Example

An example of a test for `add()`, using real javascript:

```javascript

function add(a, b) { return (a + b); }
var result = add(1, 2);

console.assert(result === 3, "Expected 1 + 2 to equal 3");

```

Typically, developers will use a testing framework instead of writing assertion logic by hand.

This will actually run in a browser, but you should think of it as pseudocode.

In the real world, people use frameworks like Jasmine or Mocha.

---

## Why Test?

 - Makes it easier to quickly test one application in many browsers (IE).
 - Decreases time spent on manual testing.
 - Quickly identify introduction of unintentional defects.
 - Eases new developers onto a team (less risk of breakage)

---

## Jasmine

Most teams use a testing framework, rather than reinvent the wheel.

 * Provides a consistent testing API across projects.
 * Large ecosystem of 3rd party testing tools.
 * Most testing "edge cases" have been solved.

Jasmine is a 3rd party tool that works well with React. It is a separate project from React.

Jasmine provides a uniform set of JavaScript functions that verify the functionality of an application.

We've got a long way to go before we talk about React.

Before we can learn testing in React, we must first learn Jasmine.

---

## Writing "Real" Tests with Jasmine

What does a Jasmine spec look like?

```javascript

describe("Calcuator addition", function(){
  it("adds 2 and 2", function(){
    var result = add(2,2);
    expect(result).toEqual(4);
  });
});

```

The code you see here will run in a browser if properly set up.

The Jasmine API is written to be human readable.

When properly written, Jasmine tests can read like documentation.

---

## Manual Jasmine Setup

How would you run a Jasmine spec in the browser?

```html

  <!-- Jasmine related files -->
  <link rel="stylesheet" type="text/css" href="/lib/jasmine.css">
  <script src="jasmine.js"></script>
  <script src="jasmine-html.js"></script>
  <script src="jasmine-boot.js"></script>

  <!-- Your application -->
  <script src="my\_bundle.js"></script>

  <!-- The tests -->
  <script src="my\_app_test.js"></script>

```

---

## "describe", "it", "expect", "matchers"

Jasmine provides the following API:

 * `describe`: Contains a collection of related tests.
 * `it`: Contains a test for one piece of functionality.
 * `matchers`: Assertions like `toBe` and `toEqual`.
 * `expect`: Takes an "actual" value and performs assertions.


Try to keep `describe` blocks related to one set of functionality.

Try to confine `it` blocks to one individual aspect of a functionality.

If that sounds very relative, it's because it is.

Structure of these blocks is often a matter of readability.

---

## Common Assertions

Jasmine comes preloaded with many useful matchers such as:

`toBe`, `toBeCloseTo`, `toBeDefined`, `toBeFalsy`, `toBeGreaterThan`, `toBeLessThan`, `toBeNull`, `toBeTruthy`, `toContain`, `toEqual`, `toMatch`, `toThrow`

It is also possible to define custom or 3rd party matchers.

---

## "before" and "after" blocks

 * Sometimes its necessary to setup or teardown state before and after a test suite.
 * For this, Jasmine provides `beforeEach`, `afterEach`, `beforeAll`, `afterAll` blocks

```javascript

describe("my test suite", function(){
  var testUser
  beforeEach(function(){
    // Will be run before each 'it' block.
    testUser = generateUser();
  });
});

```

Can you think of any times when this would be useful?

---

## Temporarily Disabling a Test

 * Occasionally, tests in a suite will fail for known reasons.
 * This can be a distraction from other valid tests.
 * `it` and `describe` blocks can be disabled by prepending an `x`
 * You may also call `pending("with a message")`.

```javascript
// Notice the "x":
xdescribe("my test suite", function(){
  it("never runs this block", function(){ /* */ });
});

```

This is usually used in continuous integration systems that will reject a deployment when tests fail.

Often times, the team may know of a bug, but still needs to deploy.

---

## Dealing with Asynchronous Tests

 * How can Jasmine know that a test has finished when testing asynchronous functions?
 * Jasmine passes in a `done()` function to all test blocks.
 * A test can be made asynchronous by passing in a `done` argument.
 * Calling `done()` at a later time marks the test as complete.

```javascript
it("calls my service", function(done) {
  User.find(123)
    .then(function(resp){
      expect(resp.data.id).toEqual(123)
      done();
    })
}, optionalTimeout)

```

---

## Demo: Testing a timer with done()

In this demo, we will test the accuracy of a timer function.

The timer executes asynchronously, so we will need to use done().

files:

 * `unit_testing/demos/async_test.html`

What happens if we fail to call `done()`?

What happens if we don't pass `done()` into the `it` block?

---

## Dealing with Timeouts

 * Jasmine will wait a default max of 5 seconds for each test.
 * Occasionally, its necessary to wait longer than that
 * Methods like `beforeEach` and `it` can take a second timeout argument
 * `jasmine.DEFAULT_TIMEOUT_INTERVAL` adjusts the amount of milliseconds to wait when running async tests.

---

## Avoiding Real World Side Effects

 - How do you handle calls to AJAX endpoints?
 - How do you prevent creating or using "real world" data?

The key to avoiding this involves swapping implementations.

Jasmine accomplishes this using "spy objects". Let's take a look.

---

## Spies

With Spy objects, you can swap out an object's real implementation and see:

 * How many times the method was called
 * Which parameters were passed to a method
 * Prevent a method from being called (and return dummy data).
 * Stub a function to trigger a failure case (to test error handling)

You can think of a spy as an empty function that can record and playback trained response, as well as provide meta data for test info.

Most developers use spies in conjunction with the dependency injector to test their apps.

But it's part of Jasmine, not React. Keep that in mind while we go through the Demos

---

## Demo: Tracking Method Calls

files:

 * `unit_testing/demos/spy_object.html`

REMEMBER: Functions in JavaScript are objects, too!

---

## Providing Fake Return Values

The most common use case for a Jasmine spy.

```javascript

var fakeUser = {name: "Rick"};
spyOn(UserLib, "fetch").and.returnValue(fakeUser);
UserLib.fetch("Rick"); // => {name: "Rick"}

// Both are OK:
expect(userDAO.fetch).toHaveBeenCalled();
expect(userDAO.fetch).toHaveBeenCalledWith("Rick");
```

In this example, we're replacing the real method with a fake one that returns a pre-defined object.

This is useful when you want to avoid actually calling the function.

---

## Fake Sequences of Return Values

Useful when simulating a series of events.

```javascript

var user = {};
var fakeUser1 = {name: "Rick"};
var fakeUser2 = {name: "Sally"};
spyOn(user, "fetch")
  .and
  .returnValues(fakeUser1, fakeUser2); // Notice "values" is plural.
user.fetch(); // {name: "Rick"}
user.fetch(); // {name: "Sally"}

```

Note:  Returns `undefined` after fake values are expended.

---

## spy.and.callThrough

 * By default, spies won't call the actual implementation function they spy on.
 * But spies *can* call the original if you choose to do so.

```javascript

spyOn(user, "destroy");
spyOn(user2, "destroy").and.callThrough();
user.destroy();  // Does not call the real user.destroy
user2.destroy(); // Actually calls user2.destroy

```

Spies let you do more than just swap return values. You can also do things like check what parameters were passed, how many times the function was called and a few other things.

---

## Simulating Exceptions

Testing errors and exception handling is straightforward.

```javascript

  spyOn(userDAO, "fetch").and.throwError("Unable to fetch user");
  expect(function() { userDAO.fetch() }).toThrow();

```

---

## createSpy and createSpyObj

There are two alternatives to the `spyOn(obj, attr)` syntax.

```javascript

  // createSpyObject: (creates object with spies as attributes)
  var user1 = jasmine.createSpyObj('user1', ['load', 'update']);

  // createSpy: (returns a single spy function)
  var user2 = {};
  user2.load = jasmine.createSpy('load'); // Pass in a name.

```

These are "bare" spies with no underlying function implementation (unlike previous examples).

This is useful when stubbing callbacks or examining parameters passed to them.

---

## Other Spy Functionalities

 * We've covered the main use cases for spies when using React
 * Spy objects offer many other advanced use cases
 * For more usages of spies, see the official Jasmine docs
    * http://jasmine.github.io

---

## Questions?

 We now know how to manually build a test suite using Jasmine.

 We also learned how to swap out implementations using "spies".

 Next, we will learn how to automate this process using a "test runner".

 Any questions before we move forward?

---

## Jasmine CLI

 * Jasmine CLI enables javascript unit testing within NodeJS.
 * This is useful when you do not need a DOM for testing purposes.

---

## Configuring Jasmine CLI

Jasmine CLI will look for `spec/support/jasmine.json`

```

{
  "spec_dir": "spec",
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  "helpers": [
    "helpers/**/*.js"
  ],
  "stopSpecOnExpectationFailure": false,
  "random": false
}

```

---

## Karma

 * Previously, we learned how to build a test runner in an HTML file.
 * Keeping track of all test dependencies can become tedious and error prone.
 * To increase productivity, many JavaScript developers (even non-React developers) use "Karma" as a means of running a front end test suite.

---

## Why Use Karma?

 * No need to fumble with script tags and HTML files
 * Just run `karma init` from the command prompt.

Karma takes the head ache out of including script tags and manually running each browser you want to test against.

It's configuration based, but has an interactive configuration builder.

---

## How Karma Works

 > "...Karma is essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results for each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.""

 -- Karma Documentation

---

## Karma Startup

 1. `karma init` generates a `karma.conf.js` file by asking you a series questions.
 2. `karma start` will run your tests using the options found in `karma.conf.js`.
 3. When run, `karma` will open a browser of your choosing against the test files specified.

```
karma start karma.conf.js
```

By default, your config file will be called karma.conf.js

---

## Installation

To gain access to the `karma` command, install `karma-cli` globally.

```
  npm install -g karma-cli
```

---

## Demo: Running 'karma init'

 In this demo, we will walk through each step of the `karma init` command.

 When we finish, we will examine the resulting `karma.conf.js`.

SEE: `unit_testing/demos/karma/karma.conf.js`.

---

## Using the Debug Tab

 * It is possible to set breakpoints (`debugger` statements) in tests.
 * Click the `debug` button on the Karma browser window and see the JavaScript console for test suite details.
 * Hit the refresh button to run the tests again.

---

## Testing Various Browsers

 * Karma supports various "launchers"
 * The most popular are Chrome (preinstalled) and IE (`karma-ie-launcher`)
 * Launchers can be installed via `npm`

```
npm install karma-firefox-launcher --save-dev

```

---

## File Patterns

 The files: and exclude: options use file matching patterns.

 - `/*.spec.js`: All files ending with ".spec.js" and subdirectories
 - `/!(lib).js`: Includes *.js, but excludes files like "mylib.js".
 - `/(.spec|.test).js`: all ".spec.js" and ".test.js" files.

---

## Questions?

 Now that we have automated the testing process, let's learn about the tools provided by React for testing.
