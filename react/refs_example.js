import React from "react";
import ReactDOM from "react-dom";

class TheChild extends React.Component {
  myFunc() { console.log('hello'); }
  render() { return <p>Look at the console.</p>; }
}

class TheParent extends React.Component {
  render() {
    return (
      <div>
        // NOTE: COMPONENT REFS ACT DIFFERENTLY THAN DOM REFS!!!!!
        // Ref on a component == passes component instance.
        // Ref on a DOM element == passes DOM element

        // Style 1: strings (this.refs.foo)
        <TheChild ref='foo' />
        // Style 2: functions (use parameter variable provided)
        <div ref={ (domElement) => { this.domChild = domElement } } />
      </div>
    );
  }
  componentDidMount() { this.refs.foo.myFunc(); }
}

ReactDOM.render(<TheParent/>, document.getElementById("app"))
