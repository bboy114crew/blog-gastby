---
title: Pure React
date: "2019-03-12"
template: "post"
draft: false
slug: "/posts/pure-react/"
category: "React"
tags:
  - "Note"
description: "Pure React"
---

Pure React. No compile step. No JSX. No Babel. No Webpack or Parcel. Just some JavaScript on a page.
Create an index.html and put it into a src/ directory inside of your project folder. In index.html put:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./style.css">
  <title>Pure React</title>
</head>

<body>
  <div id="root">not rendered</div>
  <script src="https://unpkg.com/react@16.9.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.9.0/umd/react-dom.development.js"></script>
  <script>
    // Your code is going to go here
  </script>
</body>

</html>
```

Now open this file in your browser. On Mac, hit ⌘ (command) + O in your favorite browser, and on Windows and Linux hit CTRL + O to open the Open prompt. Navigate to wherever you saved the file and open it. You should see a line of text saying "not rendered".

- We're adding a root div. We'll render our React app here in a sec. It doesn't have to be called root, just a common practice.
- We have two script tags.
  1. The first is the React library. This library is the interface of how to interact with React; all the methods (except one) will be via this library. It contains no way of rendering itself though; it's just the API.
  2. The second library is the rendering layer. Since we're rendering to the browser, we're using React DOM. There are other React libraries like React Native, React 360 (formerly React VR), A-Frame React, React Blessed, and others. You need both script tags. The order is not important.
- The last script tag is where we're going to put our code. You don't typically do this but I wanted to start as simple as possible. This script tag must come after the other two.

In the last script tag, put the following.
```javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Me!")
  );
};
ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

This is the simplest React app you can build.

- The first thing we do is make our own component, App. React is all about making components. And then taking those components and making more components out of those.
- There are two types of components, function components and class components. This is a function component. We'll see class components shortly.
- A function component must return markup (which is what React.createElement generates.)
- These component render functions have to be fast. This function is going to be called a lot. It's a hot code path.
- Inside of the render function, you cannot modify any sort of state. Put in functional terms, this function must be pure. You don't know how or when the function will be called so it can't modify any ambient state.
- React.createElement creates one instance of some component. If you pass it a string, it will create a DOM tag with that as the string. We used h1 and div, those tags are output to the DOM. If we put x-some-custom-element, it'll output that (so web components are possible too.)
- The second empty object (you can put null too) is attributes we're passing to the tag or component. Whatever we put in this will be output to the element (like id or style.)
- ReactDOM.render is what takes our rendered App component and puts in the DOM (in our case we're putting it in the root element.)
- Notice we're using React.createElement with App as a parameter to ReactDOM.render. We need an instance of App to render out. App is a class of components and we need to render one instance of a class. That's what React.createElement does: it makes an instance of a class.