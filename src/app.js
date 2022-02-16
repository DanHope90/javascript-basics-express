/* eslint-disable use-isnan */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable radix */
const express = require('express');

const res = require('express/lib/response');

const { uppercase, lowercase, firstCharacter, firstCharacters } = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

const app = express();

app.use(express.json());

// STRINGS

app.get('/strings/hello/world', (req, res) => {
  res.status(200).json({ result: 'Hello, world!' });
});

app.get('/strings/hello/:name', (request, res) => {
  res.status(200).json({ result: `Hello, ${request.params.name}!` });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-character/:string', (req, res) => {
  const { string } = req.params;
  res.status(200).json({ result: firstCharacter(string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;

  if (length) {
    res.status(200).json({ result: firstCharacters(string, length) });
  } else {
    res.status(200).json({ result: firstCharacter(string) });
  }
});

// NUMBERS

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res, next) => {
  const { a, b } = req.body;

  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b)) === NaN) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).send({ result: multiply(req.body.a, req.body.b) });
  }
});

app.post('/numbers/divide', (req, res, next) => {
  const { a, b } = req.body;

  if (a === 0) {
    res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }
  return Number.isNaN(Number(a)) || Number.isNaN(Number(b))
    ? res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' })
    : res.status(200).send({ result: divide(req.body.a, req.body.b) });
});

app.post('/numbers/remainder', (req, res, next) => {
  const { a, b } = req.body;

  if (a === 0) {
    res.status(200).json({ result: 0 });
  }
  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (!a || !b) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  return Number.isNaN(Number(a)) || Number.isNaN(Number(b))
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: remainder(req.body.a, req.body.b) });
});

// ARRAYS //

app.post('/arrays/element-at-index/:i', (req, res, next) => {
  const { array } = req.body;
  const { i } = req.params;

  res.status(200).json({ result: getNthElement(i, array) });
});

app.post('/arrays/to-string', (req, res, next) => {
  const { array } = req.body;

  res.status(200).json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res, next) => {
  const element = req.body.value;
  const { array } = req.body;

  res.status(200).json({ result: addToArray2(element, array) });
});

app.post('/arrays/starts-with-vowel', (req, res, next) => {
  const { array } = req.body;

  res.status(200).json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { index } = req.query;
  const { array } = req.body;

  if (index === undefined) {
    res.status(200).send({ result: removeNthElement2(0, array) });
  }
  res.status(200).send({ result: removeNthElement2(index, array) });
});

// Booleans

app.post('/booleans/negate', (req, res) => {
  const { value } = req.body;

  res.status(200).json({ result: negate(value) });
});

app.post('/booleans/truthiness', (req, res) => {
  const { value } = req.body;

  res.status(200).json({ result: truthiness(value) });
});

app.get('/booleans/is-odd/:num', (req, res) => {
  const num = parseInt(req.params.num);

  return Number.isNaN(Number(num))
    ? res.status(400).json({ error: 'Parameter must be a number.' })
    : res.status(200).json({ result: isOdd(num) });
});

app.get('/booleans/:string/starts-with/:char', (req, res) => {
  const { char, string } = req.params;

  if (char.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    res.status(200).json({ result: startsWith(char, string) });
  }
});

module.exports = app;
