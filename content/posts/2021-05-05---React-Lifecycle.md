---
title: React Lifecycle
date: "2021-05-05"
template: "post"
draft: false
slug: "/posts/react-lifecycle/"
category: "React"
tags:
  - "Note"
description: "React Explained 101."
---

```
→  render → reconciliation → commit
         ↖                   ↙
              state change
```

Let's define a few terms:

- The "render" phase: create React elements React.createElement
- The "reconciliation" phase: compare previous elements with the new ones
- The "commit" phase: update the DOM (if needed).

React exists in its current form (in large part) because updating the DOM is the
slowest part of this process. By separating us from the DOM, React can perform
the most surgically optimal updates to the DOM to speed things up for us
big-time.

A React Component can re-render for any of the following reasons:

1. Its props change
2. Its internal state changes
3. It is consuming context values which have changed
4. Its parent re-renders

React is really fast, however, _sometimes_ it can be useful to give React little
tips about certain parts of the React tree when there's a state update. You can
opt-out of state updates for a part of the React tree by using one of React's
built-in rendering bail-out utilities: `React.PureComponent`, `React.memo`, or
`shouldComponentUpdate`.