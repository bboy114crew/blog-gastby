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

Pure React. No compile step. No [JSX](https://reactjs.org/docs/jsx-in-depth.html). No [Babel](https://babeljs.io/). No [Webpack](https://webpack.js.org/) or [Parcel](https://v2.parceljs.org/). Just some JavaScript on a page.
Create an ```index.html``` and put it into a ```src/``` directory inside of your project folder. In index.html put:
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

Now open this file in your browser. On Mac, hit ```⌘ (command) + O``` in your favorite browser, and on Windows and Linux hit ```CTRL + O``` to open the Open prompt. Navigate to wherever you saved the file and open it. You should see a line of text saying "not rendered".

- We're adding a root div. We'll render our React app here in a sec. It doesn't have to be called root, just a common practice.
- We have two script tags.
  1. The first is the React library. This library is the interface of how to interact with React; all the methods (except one) will be via this library. It contains no way of rendering itself though; it's just the API.
  2. The second library is the rendering layer. Since we're rendering to the browser, we're using [React DOM](https://reactjs.org/docs/react-dom.html). There are other React libraries like [React Native](https://reactnative.dev/), [React 360](https://github.com/facebookarchive/react-360) (formerly React VR), [A-Frame React](https://github.com/supermedium/aframe-react), [React Blessed](https://github.com/Yomguithereal/react-blessed), and others. You need both script tags. The order is not important.
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
- A function component must return markup (which is what ```React.createElement``` generates.)
- These component render functions have to be fast. This function is going to be called a lot. It's a hot code path.
- Inside of the render function, you cannot modify any sort of state. Put in functional terms, this function must be pure. You don't know how or when the function will be called so it can't modify any ambient state.
- ```React.createElement``` creates one instance of some component. If you pass it a string, it will create a [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) tag with that as the string. We used h1 and div, those tags are output to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). If we put x-some-custom-element, it'll output that (so web components are possible too.)
- The second empty object (you can put null too) is attributes we're passing to the tag or component. Whatever we put in this will be output to the element (like id or style.)
- ```ReactDOM.render``` is what takes our rendered App component and puts in the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (in our case we're putting it in the root element.)
- Notice we're using ```React.createElement``` with App as a parameter to ```ReactDOM.render```. We need an instance of App to render out. App is a class of components and we need to render one instance of a class. That's what ```React.createElement``` does: it makes an instance of a class.

Let's separate this out from a script tag on the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) to its own script file (best practice.) Make a new file in your src directory called ```App.js``` and cut and paste your code into it.

Modify your code so it looks like:
```javascript
const Pet = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Misa"),
    React.createElement("h2", {}, "Dog"),
    React.createElement("h2", {}, "Husky"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

> You will be seeing a console warning ```Warning: Each child in a list should have a unique "key" prop```. in your browser console. React's dev warnings are trying to help your code run faster. Basically React tries to keep track of components are swapped in order in a list and it does that by you giving it a unique key it can track. If it sees two things have swapped, it'll just move the components instead of re-rendering.

- To make an element have multiple children, just pass it an array of elements.
- We created a second new component, the Pet component. This component represents one pet. When you have distinct ideas represented as markup, that's a good idea to separate that it into a component like we did here.
- Since we have a new Pet component, we can use it multiple times! We just use multiple calls to ```React.createElement```.
- In createElement, the last two parameters are optional. Since Pet has no props or children (it could, we just didn't make it use them yet) we can just leave them off.
- Okay so we can have multiple pets but it's not a useful component yet since not all pets will be Havanese dogs named Luna (even though I have a Husky dog named Misa.) Let's make it a bit more complicated.

```javascript
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Misa",
      animal: "Dog",
      breed: "Husky",
    }),
    React.createElement(Pet, {
      name: "Chun",
      animal: "Bird",
      breed: "Fantail",
    }),
    React.createElement(Pet, { name: "King", animal: "Cat", breed: "British Shorthair" }),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

Now we have a more flexible component that accepts props from its parent. Props are variables that a parent (App) passes to its children (the instances of Pet.) Now each one can be different! Now that is far more useful than it was since this Pet component can represent not just Misa, but any Pet. This is the power of React! We can make multiple, re-usable components. We can then use these components to build larger components, which in turn make up yet-larger components. This is how React apps are made!