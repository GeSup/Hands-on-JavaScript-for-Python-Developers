let name = '',
  planet = '',
  films = [],
  filmNames = ''
let hello = "Hello! My name is {name} and I'm from {planet}. I've been in {films} and I'm a Jedi."

fetch('https://swapi.dev/api/people/1/')
  // write your code here.
  .then(response => response.json())
  .then(pejson => {
    name = pejson.name;
    fetch(pejson.homeworld).then(response => response.json()).then(plJson => {
      planet = plJson.name
      for (const film of pejson.films.sort()) {
        films.push(fetch(film).then(response => response.json()).then(fJson => fJson.title))
      }
      Promise.all(films).then((response) => {
        filmNames = response.join(', ')
        hello = hello.replace('{name}', name).replace('{planet}', planet).replace('{films}', filmNames)
        document.querySelector('#main').innerHTML = hello
      })
    })
  })