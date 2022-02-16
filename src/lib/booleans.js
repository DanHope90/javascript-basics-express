function negate(a) {
  return !a;
}

function both(a, b) {
  return a && b;
}

function either(a, b) {
  return a || b;
}

function none(a, b) {
  return !a && !b;
}

function one(a, b) {
  return !a == b;
}

function truthiness(a) {
  return !!a;
}

function isEqual(a, b) {
  return a === b;
}

function isGreaterThan(a, b) {
  return a > b;
}

function isLessThanOrEqualTo(a, b) {
  return a <= b;
}

function isOdd(a) {
  return a % 2 === 1;
}

function isEven(a) {
  return a % 2 === 0;
}

function isSquare(a) {
  return Math.sqrt(a) % 1 === 0;
}

function startsWith(char, string) {
  return string.startsWith(char, string);
}

function containsVowels(string) {
  // review this one //
  return /[aeiou]/gi.test(string);
}

function isLowerCase(string) {
  return string === string.toLowerCase();
}

module.exports = {
  negate,
  both,
  either,
  none,
  one,
  truthiness,
  isEqual,
  isGreaterThan,
  isLessThanOrEqualTo,
  isOdd,
  isEven,
  isSquare,
  startsWith,
  containsVowels,
  isLowerCase,
};
