'use strict';

const superagent = require('superagent');

const url = 'https://swapi.co/api/people';

const fetchPeopleWithPromises = () => {
  superagent.get(url)
    .then(data => {
      return data.body.results.map(person => person.url);
    })
    .then(array => {
      return array.map(url => superagent.get(url));
    })
    .then(results => {
      Promise.all(results)
        .then(results => {
          results.forEach(person => console.log('Promise', person.body.name));
        });
    })
    .catch(error => console.error(error));
};

const fetchPeoplewithAsync = async () => {
  try{
    const data= await superagent.get(url);
    const peopleData = data.body.results;
    const peopleUrls = peopleData.map(people => people.url);
    const peoplePromises = await Promise.all(peopleUrls.map(url => superagent(url)));

    peoplePromises.forEach(person => console.log('async', person.body.name));
  }
  catch(error){console.error(error);}
};

fetchPeopleWithPromises();
fetchPeoplewithAsync();