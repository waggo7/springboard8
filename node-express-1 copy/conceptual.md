### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  -utlizing callbacks, promises, and await functions

- What is a Promise?
  - an object holding the place of data being retrieved/sent

- What are the differences between an async function and a regular function?
  - async functions dont run until

- What is the difference between Node.js and Express.js?
  -node.js is the foundation that express is built. express is a libraty designed to make node easier, more effecient, and more powerful

- What is the error-first callback pattern?
  -anticipating an error before anticipating the code actually running

- What is middleware?
  -code that runs between  the beginning of the route and the end of the callback function

- What does the `next` function do?
  -'next' function moves the data processing on the the NEXT data and not staying on the current route

- What does `RETURNING` do in SQL? When would you use it?
  -returning displays the columns values that were changed in previous code 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
-calling this api so repeatively will get locked out per daily usage just assign 'https://api.github.com/users/${variablename}
-parameter needed to call the in put at getUsers

