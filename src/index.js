document.addEventListener('DOMContentLoaded', () => {

  const URL = 'http://localhost:3000/pups';

  loadDogs()

  function loadDogs() {
    fetch(URL)
    .then(res => res.json())
    .then(dogs => {
      addDogs(dogs);
    });
  }

  function addDogs(dogs) {
    dogs.forEach(dog => addDog(dog));
  }

  function addDog(dog) {
    let dogBar = document.getElementById('dog-bar');
    let dogSpan = document.createElement('span');

    dogSpan.textContent = dog.name;

    dogBar.appendChild(dogSpan);

    dogSpan.addEventListener('click', () => {
      displayInfo(dog);
    })
  }

  function displayInfo(dog) {

    let dogInfo = document.getElementById('dog-info');

    while (dogInfo.lastChild) {
      dogInfo.removeChild(dogInfo.lastChild);
    }

    let dogName = document.createElement('h2');
    let dogImg = document.createElement('img');
    let dogBtn = document.createElement('button');

    dogName.textContent = dog.name;
    dogImg.src = dog.image;

    if (dog.isGoodDog === true) {
      dogBtn.textContent = "Good Dog!";
    } else {
      dogBtn.textContent = "Bad Dog!";
    }

    dogInfo.appendChild(dogName);
    dogInfo.appendChild(dogImg);
    dogInfo.appendChild(dogBtn);

    dogBtn.addEventListener('click', () => {
      isGoodDogTogle(dog);
    })
  }

  function isGoodDogTogle(dog) {

    if (dog.isGoodDog) {
      dog.isGoodDog = false;
    } else {
      dog.isGoodDog = true;
    }

    payload = {id: dog.id, name: dog.name, isGoodDog: dog.isGoodDog, image: dog.image};

    fetch(URL + '/' + dog.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(json => {
      displayInfo(dog);
    });
  }
})
