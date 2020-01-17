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

async function fetchPeoplewithAsync() {
  try{
    const fullList = await superagent.get(url);
    const resultArr = fullList.body.results;
    const urlArr = resultArr.map(person => person.url);
    const returnedPromisesArr = await Promise.all(urlArr.map(url => superagent(url)));
    returnedPromisesArr.forEach(promise => console.log('async', promise.body.name));
  }
  catch(e){
    console.error(e);
  }
}

fetchPeoplewithPromises();
fetchPeoplewithAsync();

app.listen(3000, () => console.log('app is on 3000'));