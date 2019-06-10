const URL = 'http://localhost:3000/pups'

document.addEventListener('DOMContentLoaded', () => {

function main() {
  fetchDogs()
  attachListeners()
}

main()

function fetchDogs() {
  fetch(URL)
  .then(resp => resp.json())
  .then(json => {
    displayDogs(json)
  })
}


function fetchSetGoodDog(dog) {
  let payload = {name: dog.name, image: dog.image, isGoodDog: true}
  let config = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }
  fetch(URL + `/${dog.id}`, config)
  .then(resp => resp.json())
  .then(json =>  {

  })
}




function fetchSetBadDog(dog) {
  let payload = {name: dog.name, image: dog.image, isGoodDog: false}
  let config = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }
  fetch(URL + `/${dog.id}`, config)
  .then(resp => resp.json())
  .then(json =>  {

  })
}

  function fetchGoodDogs(div) {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => {
      div.innerHTML = ""
      filterGoodDogs(json)
    })
  }



function attachListeners() {
  div = document.getElementById('dog-bar')
  button = document.getElementById('good-dog-filter')
  button.addEventListener('click', () => {
    if (button.textContent === "Filter good dogs: OFF") {
      button.textContent = "Filter good dogs: ON"
      fetchGoodDogs(div)
    } else {
      button.textContent = "Filter good dogs: OFF"
      div.innerHTML = ""
      fetchDogs()
    }

  })
}



function displayDogs(json) {
  json.forEach((dog) => {
    displayDog(dog)
  })
}

function displayDog(dog) {
  let div = document.getElementById('dog-bar')
  let span = document.createElement('span')
  span.textContent = dog.name
  div.appendChild(span)
  span.addEventListener('click', () => {
    getDogInfo(dog)
  })
}

function getDogInfo(dog) {
  let div = document.getElementById('dog-info')
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let button = document.createElement('button')


  div.innerHTML = ""

  img.src = dog.image
  h2.textContent = dog.name
  if (dog.isGoodDog) {
    button.textContent = "Bad Dog!"
  } else {
    button.textContent = "Good Dog!"
  }



  button.addEventListener('click', () => {
    if (button.textContent === "Good Dog!") {
      button.textContent = "Bad Dog!"
      fetchSetGoodDog(dog)
    } else {
      button.textContent = "Good Dog!"
      fetchSetBadDog(dog)
    }


  })



  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(button)

}

function filterGoodDogs(json) {
  json.forEach((dog) => {
    if (dog.isGoodDog) {
      displayDog(dog)
    }

  })
}

















})
