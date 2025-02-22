// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const { request, response } = require("express");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/search", function (request, response) {
  const searchTerm = request.query.term;
  const quote = quotes.filter(
    (el) =>
      el.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      el.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && quote.length !== 0) {
    response.json(quote);
  } else {
    response.status(400).json({ msg: "no matches found for your search" });
  }
});

app.get("/quotes/random", function (request, response) {
  const quote = pickFromArray(quotes);
  response.send(quote);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!

app.listen(PORT);
