'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();

const url = 'https://swapi.co/api/people';

const fetchPeoplewithPromises = () => {
  superagent.get(url)
    .then(data => {
      return data.body.results.map(person => person.url);
    })
    .then(result => {
      return result.map(item => superagent.get(item));
    })
    .then(result => {
      Promise.all(result)
        .then(result => {
          result.forEach(promise => console.log('promise', promise.body.name));
        });
    })
    .catch(e => console.error(e));
};


app.listen(3000, () => console.log('app is on 3000'));