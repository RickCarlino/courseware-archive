# React Router

---

## Why Use a Router?

---

## How Do Routers Work?

---

## Install react-router

```

npm install react-router --save-dev

```

---

## Basic Setup

```

import { render } from "react-dom";
import { Router, Route, hashHistory } from 'react-router';
import App from "../project/foo/app";

render((
  <Router history={hashHistory}> // or "browserHistory"
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))

```

---

## Navigate With Link

```

import { Link } from 'react-router';

<Link to="/about">About</Link>

```

---

## Nested Routes: Step 1

 * `/app`
 * `/app/blog`
 * `/app/about`

```
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/blog" component={Blog}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

---

## Nested Routes: Step 2

```

class App extends React.Component {
  render() {
    return <div>
      <NavBar/>
        { this.props.children }
      <Footer/>
    </div>
  }
}

```

---

## Nested Routes: Result

```
When "/app/blog":

<App>
  <Blog/>
</App>

When "/app/about":

<App>
  <About/>
</App>

```

---

## Highlighting Tabs

```

<Link to="/blog" activeStyle={{ color: 'blue' }}>
  blog
</Link>

--- OR ---

<Link to="/blog" activeClassName="my-blue-css-class">
  blog
</Link>

```

---

## Reusable Nav Links

```

class NavLink extends React.Component {
  render() {
    return <Link {...this.props} activeClassName="my-active-class"/>
  }
}

// USAGE:

<NavLink to="/about">About</NavLink>

```

---

## onlyActiveOnIndex

A link to `/` will match every route, so it will always be active.

How can we fix this
```
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link>
```

---

## Route Params

```
// Pull information out of URLs
// Example: "/clients/healthcare/1234"

<Route path="/clients/:industry/:id" component={ Whatever }/>
```

Access information in current URL:

```
let params = this.props.params;
<div>
  <h2> Viewing { params.industry } client { params.id }.</h2>
</div>
```

---

## "Index" Routes

```
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
```
Results in this behavior:

```
// PSEUDO CODE ONLY!
// NOT ACTUAL IMPLEMENTATION!
<div>
  {this.props.children || <Home/>}
</div>
```

Similar to how a webserver looks for `index.html` when visiting `/`.

NEXT SLIDE: How to handle "404" errors.

---

## "Not Found" Route

```
<Route path='*' component={My404Component} />
```

---

## Programmatic Navigation

```

import { browserHistory } from 'react-router'

// .....

  handleSubmit(event) {
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  }

// ... . ..

```

---
