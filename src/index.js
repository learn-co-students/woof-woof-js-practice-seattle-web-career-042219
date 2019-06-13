
const URL = 'http://localhost:3000/pups'

let dogFilter = false

document.addEventListener('DOMContentLoaded', () => {
loadPups()
handleFilter()
})

function loadPups() {
  fetch(URL)
  .then(res => res.json())
  .then(pups => {
    displayPups(pups)
  })
}

function displayPups(pups) {

  let div = document.getElementById('dog-bar')

  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }

  if (dogFilter === false) {
    pups.forEach(pup => {
      displayPup(pup)
    })
  } else {
    pups.forEach(pup => {
      if (pup.isGoodDog === true) {displayPup(pup)}
    })
  }
}

function displayPup(pup) {

  let div = document.getElementById('dog-bar')
  let span = document.createElement('span')

  span.textContent = pup.name
  span.addEventListener('click', () => {
    showPup(pup)
  })
  div.appendChild(span)
}

function showPup(pup) {
  console.log(pup)
  let div = document.getElementById('dog-info')
  let img = document.createElement('img')
  let h2 =document.createElement('h2')
  let btn = document.createElement('button')

  img.src = pup.image
  h2.textContent = pup.name
  btn.textContent = (pup.isGoodDog? "Good Dog!" : "Bad Dog!")
  btn.id = "good-bad"

  btn.addEventListener('click', () => {
    updatePup(pup, btn)
  })

  while (div.lastChild) {
    div.removeChild(div.lastChild)
  }
  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(btn)
}

function updatePup(pup, btn) {


  let config = {
    method: 'PATCH',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({isGoodDog: !pup.isGoodDog})
}
  fetch(URL + '/' + pup.id, config)
  .then(res => res.json())
  .then(res=> {

    pup.isGoodDog = !pup.isGoodDog
    btn.textContent = (pup.isGoodDog? "Good Dog!" : "Bad Dog!")
    loadPups()
  })
  .catch(err=>console.log(err))
}

function handleFilter() {
  let filter = document.getElementById('good-dog-filter')
  filter.addEventListener('click', () => {
    dogFilter = !dogFilter
    filter.textContent = (dogFilter ? "Filter good dogs: ON" : "Filter good dogs: OFF")
    loadPups()
  })
}
