---
title: Code splitting
date: "2021-05-05"
template: "post"
draft: false
slug: "/posts/code-splitting/"
category: "React"
tags:
  - "Note"
description: "Web Performance 101."
---

Code splitting is one of the most compelling features of webpack and almost modern bundler tools.
This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel.

We have cool story behind webpack history and code-splitting feature:
Before webpack was born we have project named as [modules-webmake](https://github.com/medikoo/modules-webmake).

[Tobias Koppers](https://twitter.com/wSokra) a.k.a founder of webpack wanted Code Splitting for modules-webmake so webpack was born. Interestingly the [Code Splitting issue](https://github.com/medikoo/modules-webmake/issues/7) is still open.

We have some approaches to code splitting:
### 1. Eager loading
So if they `mouseOver` or `focus` the `<label>` for the something, we should kick off a
dynamic import 

It doesn't matter how many times you call `import('./path-to-module')`, webpack will only actually load the module once.

### 2. Prefetching modules
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

### FYI:
One great way to analyze your app to determine the need/benefit of code
splitting for a certain feature/page/interaction, is to use
[the "Coverage" feature of the developer tools](https://developers.google.com/web/tools/chrome-devtools/coverage).


### Notes
The `webpackChunkName` magic comment which will allow webpack to
place common modules in the same chunk. This is good for components which you
want loaded together in the same chunk (to reduce multiple requests for multiple
modules which will likely be needed together).

### Reference:
[Webpack - Code Splitting](https://webpack.js.org/guides/code-splitting) <br/>
[Webpack - Lazy Loading](https://webpack.js.org/guides/lazy-loading/#example) <br/>
[React - Code Splitting](https://reactjs.org/docs/code-splitting.html) <br/>
[Code splitting with dynamic imports in Next.js](https://web.dev/code-splitting-with-dynamic-imports-in-nextjs/) <br/>
[Route-level code splitting in Angular](https://web.dev/route-level-code-splitting-in-angular/) <br/>
[Vue - Lazy Loading Routes](https://router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk) <br/>
