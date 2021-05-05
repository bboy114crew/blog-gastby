---
title: Code splitting - React
date: "2021-04-21"
template: "post"
draft: false
slug: "/posts/promise-callbacl/"
category: "React"
tags:
  - "Note"
description: "React Explained 101."
---

Code splitting acts on the principle that loading less code will speed up your
app. Say for example that we're building a complex dashboard application that
includes the venerable d3 library for graphing data. Your users start
complaining because it takes too long to load the login screen.

So, assuming that performance problems can be resolved by less code, how can we
solve this one? Well, do we really _need_ to have that code for the chart when
the user loads the login screen? Nope! We could load that on-demand.

Luckily for us, there's a built-in way to do this with JavaScript standards.
It's called a dynamic import and the syntax looks like this:

```javascript
import('/some-module.js').then(
  module => {
    // do stuff with the module's exports
  },
  error => {
    // there was some error loading the module...
  },
)
```

> 📜 Learn more about dynamic imports in the browser in
> [Super Simple Start to ESModules in the browser](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser)

To take this further, React has built-in support for loading modules as React
components. The module must have a React component as the default export, and
you have to use the `<React.Suspense />` component to render a fallback value
while the user waits for the module to be loaded.

One great way to analyze your app to determine the need/benefit of code
splitting for a certain feature/page/interaction, is to use
[the "Coverage" feature of the developer tools](https://developers.google.com/web/tools/chrome-devtools/coverage).

### 1. Eager loading
So if they `mouseOver` or `focus` the `<label>` for the something, we should kick off a
dynamic import 

>  Hint: it doesn't matter how many times you call
> `import('./path-to-module')`, webpack will only actually load the module once.

### 2. Webpack magic comments
If you're using webpack to bundle your application, then you can use webpack
[magic comments](https://webpack.js.org/api/module-methods/#magic-comments) to
have webpack instruct the browser to prefetch dynamic imports:

```javascript
import(/* webpackPrefetch: true */ './some-module.js')
```

When webpack sees this comment, it adds this to your document's `head`:

```javascript
<link rel="prefetch" as="script" href="/static/js/1.chunk.js">
```

With this, the browser will automatically load this JavaScript file into the
browser cache so it's ready ahead of time.

The change itself is minimal, but pull up the DevTools to make sure it's loading
properly (you'll need to uncheck the "Disable cache" button to observe any
changes).

## Notes

Another thing which we won't cover in this workshop, but you should look into
later, is using the `webpackChunkName` magic comment which will allow webpack to
place common modules in the same chunk. This is good for components which you
want loaded together in the same chunk (to reduce multiple requests for multiple
modules which will likely be needed together).