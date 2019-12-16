/*
  Section 13 Exercise 1 Code
*/

'use strict';

const express = require('express');
const app = express();

let categories = ['people', 'pets'];

let people = [
  {
    'name': 'Valerie',
    'joke': 'What do you call a Valerie that is tall?',
    'response': 'Valertree'
  },
  {
    'name': 'Tal',
    'joke': 'What is Tal\'s favorite genre of music?',
    'response': 'Heavy Me-Tal'
  },
  {
    'name': 'Sven',
    'joke': 'What do you call a Sven that costs a lot?',
    'response': 'ExpSVENsive'
  }
];

let pets = [
  {
    'name': 'Mowgli',
    'joke': 'What kind of choir does Mowgli sing in?',
    'response': 'Mowglee club'
  },
  {
    'name': 'Jack',
    'joke': 'What do you call a Jack that catches you by surprise?',
    'response': 'sneak aJack'
  }
];

app.get('/jokebook/categories', function (req, res) {
  res.type('text');
  res.send(getCategories());
});

app.get('/jokebook/joke/:category', function (req, res) {
  if(req.params['category'] === 'pets' || req.params['category'] === 'people') {
    res.json(getJokes(req.params['category']));
  } else {
    res.status(400).json({'error': 'no category listed for ' + req.params['category']});
  }
});

function getCategories() {
  let result = "";
  for (let i = 0; i < categories.length; i++) {
    result+= "A possible category is " +  categories[i] + "\n";
  }
  return result;
}

function getJokes(category) {
  let number = 0;
  if (category === 'people') {
    number = people.length;
    return people[Math.floor(Math.random() * number)];
  }
  else {
    number = pets.length;
    return pets[Math.floor(Math.random() * number)];
  }
}

app.use(express.static('public'));
const PORT = 8000 || process.env.PORT;
app.listen(PORT);