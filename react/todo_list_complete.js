import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import styles from "./styles";

// Application state (if none found)
const DEFAULT_STATE = {
  textbox: "Rick",
  todos: [
    {
      title: "Return library books.",
      complete: false
    },
    {
      title: "Walk the dog.",
      complete: false
    }

  ]
}

function myReducer(state = DEFAULT_STATE, action) {
  let nextState = Object.assign({}, state);
  // console.log(`GOT ACTION: ${ action.type } !`);
  // console.log(`GOT PAYLOAD: ${ JSON.stringify(action.payload || {}) } !`);
  switch (action.type) {
    case "ADD_TODO":
      nextState.todos.push({ title: nextState.textbox });
      nextState.textbox = "";
      return nextState;
    case "COMPLETE_TODO":
      return nextState;
    case "UPDATE_TEXT_BOX":
      nextState.textbox = action.payload.text;
      return nextState;
  }

  return nextState;
}

let store = createStore(myReducer,
                        window.devToolsExtension && window.devToolsExtension());

function TodoInput(props) {
  return (
    <form onSubmit={ props.onSubmit }>
      <input placeholder="Enter a todo."
             value={ props.value }
             onChange={ props.onChange }
             />
      <button style={ styles }>
        Save
      </button>
    </form>
    )
}

function TodoList(props) {
  let { todos } = props;
  return <ul>
    {todos.map((todo, index) => (<li key={index}>{ todo.title }</li>))}
  </ul>
}

class App extends React.Component {
  handleInput(event) {
    let inputText = event.target.value;
    let dispatch = this.props.dispatch;
    let action = {
      type: "UPDATE_TEXT_BOX",
      payload: {
        text: inputText
      }
    }
    dispatch(action);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_TODO",
      payload: {}
    });
  }

  render() {
    debugger;
    return (
      <div>
        { this.props.children || (<h1>Not set</h1>) }
        <TodoInput onChange={ this.handleInput.bind(this) }
                   onSubmit={ this.handleSubmit.bind(this) }
                   value={this.props.textbox} />

        <TodoList todos={ this.props.todos } />
      </div>
    );
  }
}

App = connect(state => state)(App)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("app"));
