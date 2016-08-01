# Previewing Angular 2.0

improvements from Angular 1.0:

   * Simplified API. Easier to learn.
   * Easy template debugging (caught at compile time).
   * Uses TypeScript, a language for "application scale" development

---

### A Work in Progress

 * Live progress tracker: [http://splintercode.github.io/is-angular-2-ready/](http://splintercode.github.io/is-angular-2-ready/)
 * Went from "alpha" to "beta" status December 21st, 2015.
 * API can still change, but will occur in "phases" now.

The APIs are still evolving.

**Angular 1.0 is still the most stable platform for large scale projects**.

---

### Basic Components

```typescript
import {Component} from 'angular2/core';

@Component({
    selector: 'my-component-class',
    template: '<p>{{ title }}</p>'
})

export class MyComponentClass {
    title = "My First Angular 2 App"
}

```

It's a huge simplification over old style DDOs.

Many developers are noticing shorter training cycles as a result.

Once you define a root component, you need to "bootstrap" your app.

---

### Nested Components

Components can be re-used and nested.

```typescript
import {Component} from 'angular2/core';
import {OtherComponent} from './other_component';

@Component({
  selector: 'my-app',
  directives: [OtherComponent],
  template:`<other-component></other-component>`,
})
export class AppComponent {
}
```

---

### Bootstrap the App

```typescript
import {bootstrap} from 'angular2/platform/browser';
import {MyComponentClass} from './MyComponentClass';

bootstrap(MyComponentClass);

```

```html
<!-- ... -->
<body>
  <my-component-class></my-component-class>
</body>
<!-- ... -->
```

With this information, Angular can start the application from a root component.

This is similar to `ng-app` or `Angular.bootstrap`.

Angular will replace this with your components template.

---

### Handling Events

```typescript
@Component({
  selector: 'my-app',
  template: `
    <button (click)="myClickHandler($event)">
      {{ count }}
    </button>
  `
})
export class AppComponent {
  public count: number = 0;
  myClickHandler(event) { this.count++; }
}

```

Events handlers are assigned with the parenthesis syntax `(name)="handler()"`.

Instead of a scope object, we just use component properties, similar to `controller as` syntax.

Custom events are possible.

---

### Passing Data in Events

Example template that grabs the data inside an `<input>` tag:

```html
<input type="text" #myInput>
<button (click)="someInputHandler(myInput.val, $event)">
  Click Here!
</button>
```

---

### Passing Down Properties

```
<a [href]="aDynamicURL">Go Back</a>
```

---

### Passing Down Properties

```typescript

@Component({
  selector: 'my-app',
  template: `
    <p>
      Current Count: <input [value]="count">
    </p>
  `
})
export class AppComponent {
  public count: number = 0;
}

```

We just saw how to read events. Let's see how to write attributes.

---

### Two Way Data Binding

```typescript

@Component({
  selector: 'my-app',
  template: `
    <p>
      {{ count }} <input [(ngModel)]="count">
    </p>
  `
})
export class AppComponent {
  public count: number = 0;
}

```

The syntax you see here is the so-called "banana in a box" attribute.

---

### Embedded Templates (Formerly Transclusion)

An asterisk (`*`) indicates that a template has an "embedded template".

```html
<section *ngIf="showSection">
  <p>
    This will be used as a template
    if "showSection" evaluates to true
  </p>
</section>

```

This means that the children of the attribute will be a "template in a template".

---

### Local Template Variables

```html

<ul>
  <li *ngFor="let user of user">
    {{ user.name }}
  </li>
</ul>

```

"Structural directives" (`ngIf`, `ngFor`, etc...) can pass local variables with the `#lvarName` syntax.

There's also something called a "micro syntax", which you can see in the `user of users` expression.

---

### Creating Services

A service can be instantiatiated by declaring a class and marking it as "@Injectable()".

```typescript
import {Injectable} from 'angular2/core';

@Injectable()
export class UserService {
  getUsers() {
    /* Return AJAX or Promise here . . . */
  }
}

```

**Note: ** Don't forget to call `@Injectable()` by adding `()` at the end!

---

## Injecting The Service

```typescript

import {UserService} from './user_service';
import {Component} from 'angular2/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>`,
  providers: [UserService] // <===
})

export class AppComponent {
  // Notice new constructor params:
  constructor(private _userService: UserService) { }
}

```

Changing the constructor without changing "providers" causes an error.

---

### Utilizing Lifecycle Hooks

Angular provides "lifecycle" methods on component methods such as `onInit` to call functionality.

```typescript

import {OnInit} from 'angular2/core';

export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
```
** Constructors should be kept light. ** Use lifecycle hooks as a means of isolating behavior out of constructors.

See: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html

---

### Preparing for the Future

 * Some applications will be easier to upgrade than others.
 * An incremental upgrade is the recommended way to upgrade an application.
 * Follow the Angular 1.0 style guide (Google recommends John Papa's guide)

---

### Project Changes

 * Consider migrating to typescript (even for current Angular 1 code)
     * Gradually add type annotations
     * Gradually start using classes
 * Migrate to a module loader such as SystemJS or Webpack
 * Define services and controllers as TypeScript classes
 * Use `restrict: 'E'` and `scope: {}` where possible.
 * Avoid `compile:`, `replace: true`, `priority` and `terminal`.
 * Use `angular.component()` API ( Angular > 1.5 only )
 * Consider switching `ng-app` to `angular.bootstrap`

---

An "upgrade ready" component:

```javascript
export function heroDetailDirective() {
  return {
    scope: {},
    bindToController: {
      hero: '=',
      deleted: '&'
    },
    template: `
      <h2>{{ctrl.hero.name}} details!</h2>
      <div><label>id: </label>{{ctrl.hero.id}}</div>
      <button ng-click="ctrl.onDelete()">Delete</button>
    `,
    controller: function() {
      this.onDelete = () => {
        this.deleted({hero: this.hero});
      };
    },
    controllerAs: 'ctrl'
  }
}
```

---

Another upgrade ready directive, using the `.component()` API:
Referenced from [Angular 2 Upgrade Docs](https://angular.io/docs/ts/latest/guide/upgrade.html#!#upgrading-with-the-upgrade-adapter).

```javascript
export const heroDetail = {
  bindings: {
    hero: '=',
    deleted: '&'
  },
  template: `
    <h2>{{heroDetail.hero.name}} details!</h2>
    <div><label>id: </label>{{heroDetail.hero.id}}</div>
    <button ng-click="heroDetail.onDelete()">Delete</button>
  `,
  controller: function() {
    this.onDelete = () => {
      this.deleted({hero: this.hero});
    };
  }
};
```

---

### Angular 2.0 Upgrade Adapter

 * It is possible to mix Angular 1 directives and Angular 2 components using the [Angular 2 Upgrade Adapter](https://angular.io/docs/ts/latest/guide/upgrade.html#!#upgrading-with-the-upgrade-adapter).

---

### How the Upgrade Adapter Works

Every element in the DOM is owned by exactly one of the two frameworks.

The other framework ignores it.

If an element is owned by Angular 1, Angular 2 treats it as if it didn't exist, and vice versa.

The root of the application is always an Angular 1 template.

---

### External Resources

https://angular.io/

http://angularjs.blogspot.com/2015/08/angular-1-and-angular-2-coexistence.html

http://www.typescriptlang.org/Handbook
