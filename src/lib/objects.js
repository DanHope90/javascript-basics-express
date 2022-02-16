const createPerson = (name, age) => {
return {name, age};
};

const getName = object => {
  return object.name;
};

const getProperty = (property, object) => {
  return object.age;
};

const hasProperty = (property, object) => {
  return object.hasOwnProperty(property);
};

const isOver65 = person => {
  return person.age > 65
  };

const getAges = people => {
  return people.map(people => people.age);
};

const findByName = (name, people) => {
  return people.find(people => people.name === name);
};

const findHondas = cars => {
 return cars.filter(cars => cars.manufacturer === 'Honda');
};

const averageAge = people => {
 const totalAge = people.reduce((accAge, eachPerson) => {
  return accAge + eachPerson.age;
}, 0);
  return totalAge / people.length;
};

const createTalkingPerson = (name, age) => {
  return {
    name: name,
    age: age,
    introduce: introducePerson => {
    return `Hi Fred, my name is ${name} and I am ${age}!`;
   }
  };  
};

module.exports = {
  createPerson,
  getName,
  getProperty,
  hasProperty,
  isOver65,
  getAges,
  findByName,
  findHondas,
  averageAge,
  createTalkingPerson
};
