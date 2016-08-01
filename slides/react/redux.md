# Redux

---

## What is Flux?

---

## What is Redux?

 - Created by Dan Abramov
 - ~1 year old
 - Modeled after Elm architecture.

---

## Strucutre

 - All state in one JS object.
 - All state changes are explicit
 - State changes can be logged (or even reversed!)
 - Scales well for mid and large size apps
 - Might be overkill for smaller apps.

---

## The State Tree (Store)

 - State tree is READ ONLY!
 - State is modified by "dispatching" "actions"

---

## Creating a Store

```javascript
let myStore = Redux.createStore(myReducer);
let readState = myStore.getState();
```
---

## Observing State Changes

```javascript
myStore.subscribe(() => console.log(store.getState()))
```

---

## Un-Observing State Changes

```javascript

let stopListening = myStore
                    .subscribe(() => changeHandler());
stopListening();

```

---

## Actions

 - An action is a plain-old-javascript-object (POJO).
 - It describes *how* app state has changed (next slide)
 - On its own, it doesn't change anything.
 - *must* have a type property

---

## Example Action

```javascript
{
  type: "ADD_TODO_ITEM",
  payload: {
    title: "Hello, world!",
    author: "Rick Carlino"
  }
}
```

---

## Dispatch

Takes an action and passes it to the store, (usually) causing a state update.

---

## Example Dispatch

```javascript

store.dispatch({type: "DELETE_TODO", id: 456});

```

---

## Action Creators (Best Practice)

 * Reduces repetitive code.
 * Returns a simple action object.
 * Doesn't change anything- just a factory function for an action. (next)
 * Mutation and stateful functions are OK here.
 * **Function "side effects" can go here!**

---

## Action Creator Example

```javascript
function addTodo(msg) {
  return { type: "ADD_TODO", message: msg };
}
store.dispatch(addTodo("Hello!"));
```

---

## Pure vs. Impure Functions

 * `forEach` vs. `map`
 * `Array.prototype.slice` (pure)

---

## Implementing "Reducers"

 * State changes are handled by a *reducer function* (next).
 * Reducers must NEVER mutate state (pure functions only).

```
reducerFn(currentState, action): nextState
```

---

## A Reducer Function

```javascript
function myReducer(state = [], action) {
  if (action.type === "ADD_TODO") {
    // Return *new* array- never mutate!
    return [...state, {title: "a new todo"}]
  } else {
    return state;
  }
}
```

---

## Avoiding Accidental Mutation

 * Use libraries like `DeepFreeze`
 * Use ES6 spread operator: `[...oldArray, "foo"]`
 * Use `lodash.cloneDeep`
 * `newObj = Object.create({}, oldObj)`
 * `let newVal = Object.assign({}, oldVal)`
 * Use immutable.js

---

## Reducer Composition

 * When dispatched, actions flow through reducers.
 * Dispatch functions can be broken down into smaller functions.
 * Different reducers become responsible for different branches of the state tree.
 * Each "slice" of the state tree can theoretically have its own reducer function.

---

## combineReducers() example

**Maps state field name to the function that manages it.**

```javascript
let mainReducer = Redux.combineReducers({
  // Handles "state.myNestedState"
  myNestedState: function(state, action) {},
  // Handles "state.users"
  users: function(state, action) {},
  // Handles "state.todoItems"
  todoItems: function(state, action) {}
})
```

---

## combineReducers()

 * *Optional* method for reducing boilerplate.
 * Has a very simple API (next slide) for managing state sub trees.
 * Input: A tree of reducer functions.
 * Output: A new top level reducer.

---

## Oversimplified React Integration

```
  let add = () => store.dispatch({
    type: "ADD_TODO",
    text: "Hardcoded example text"
  });

  <button onClick={ add }>
    Add Todo
  </button>
```

---

## "Presentational" Components

 * Don't specify behavior.
 * Just renders data.
 * Sometimes called "dumb" components.
 * Business logic is passed down via callbacks in props.
 * Doesn't know what `store` or `dispatch` are.

---

## "Presentation" Component Example

```
<TodoItem onClick={ myBusinessLogic } />
```

---

## "Container" Components

 * Aware of state.
 * Subscribed to store.
 * `forceUpdate()` on state change.
 * Sometimes called "smart" components.
 * Less common than presentation components, but required.

---

## Container Example

```javascript
class Foo extends Component {
  componentDidMount() {
    this.stop = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.stop();
  }
  render() {
    let store = store.getState();
    return <AnyPresentationComponent myData={ store.anyData }/>
  }
}
```

---

## A Word of Caution

 * Separation of containers and presentation components are supposed to *increase maintainability*.
 * Do not force this separation of concerns if it does not make components easier to maintain.
 * It's a suggestion rather than a hard rule.

---

## Required Knowledge: Context

Before learning about containers, let's talk [about React Context](https://facebook.github.io/react/docs/context.html).

---

## Required Knowledge: Object.assign()

---

## Problems with Our Container

 * The previous container example has hard coded store references.
 * This hinders testing and re-usability.

---

## Option I: Pass Store via props

```javascript
  <MyContainer store={ store } />
```

**BENEFITS: ** Simplicity.
**DRAWBACKS: ** Excessive prop passing between nested container components.

---

## Option II: Use Context (Part I)

```javascript
class Provider extends Component {
  getChildContext() { return {store: this.props.store}; }
  render() { return this.props.children; }
}
// REQUIRED!!
Provider.childContextTypes = { store: React.PropTypes.object }
<Provider store={ store } />
```

---

## Option II: Use Context (Part II)

With a `<Provider/>` container, you may call `this.context.store` anywhere in a child.

 * GOOD: Less repetition.
 * BAD: Must specify `ChildComp.contextTypes` to access store. Won't work otherwise!
 * BAD: Contradicts React data-flow model.
 * BAD: Context API in React is not stable.

---

## Option II: Use Context (Part III)

 * Always set `getChildContext()` and `Provider.childContextTypes` on parent.
 * Always set `Child.contextTypes` on children.

---

## Option III: Use "react-redux"

 * The `<Provider/>` pattern shown is so common it was extracted into an NPM module.

```
import { Provider } from "react-redux";
```

---

## Mapping State and Dispatch to Props

 * Presentational components are only passed presentational data.
 * They might also be passed callbacks that wrap around the `dispatch()` function.
 * Passing props and dispatch logic to children is a *very* common pattern in Redux

---

## ReactRedux.connect()

 * A means of quickly generating container components.
 * Sets child props by reaching into store (in `context`).
 * Exposes `store.dispatch` as `this.props.dispatch` by default.

```
import { connect } from "react-redux";
let ConnectedComponent =
  connect( mapStateToProps, mapDispatchToProps )( ComponentClass );
```

---

## mapStateToProps

Sometimes, you must reference the elements `props` when mapping state to props.

```
connect(function(state, ownProps) {

})
```

---

## Selectors

 * Filters down a state tree to a useful form.
 * Ocassionally seen in places like `mapStateToProps`.

```
mySelector(state) ==> subState
```

---

## Wrapping store.dispatch()

How could we add extra functionality, such as logging?

```
function addLogger(store) {
  let oldFn = store.dispatch

  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}
```

---

## Middleware

 * A better alternative to patching `dispatch()`
 * Allows you to intercept store and action before it hits the reducer.

---

## Middleware Uses

 * Logging
 * Analytics
 * Debugging tools (Redux Devtools)
 * Handling non-standard action types, such as promises.

Real world examples: redux-thunk, redux-promise, **most 3rd party addons**.

---

## configureStore() Pattern

 * Export a factory function rather than an instance.


---

## Redux.applyMiddleware(...middlewares)

---

## Thunks and "redux-thunk"

---

## Useful Tools From Ecosystem

 * [Redux Immutable State Invariant](https://github.com/leoasis/redux-immutable-state-invariant) Check if you mutated state accidentally (dev env only).
 * [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
