const URL = "http://localhost:3000/pups";

document.addEventListener('DOMContentLoaded', () => {
  main();
})

function main() {
  const filter = document.getElementById("good-dog-filter");
  filter.addEventListener('click', onOrOff);
  loadDogs();

}

function onOrOff(event) {
  console.log(event.target.textContent)
  if (event.target.textContent.split(": ")[1] == "OFF") {
    event.target.textContent = "Filter good dogs: ON";
  } else {
    event.target.textContent = "Filter good dogs: OFF";
  }
  loadDogs();
}

function executeFilter(event, dog) {
  fetch (URL + `/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
  })
  .then(resp => resp.json())
  .then(json => showDog(json))
}

function loadDogs() {
  fetch(URL)
  .then(resp => resp.json())
  .then(json => displayDogs(json))
}

function displayDogs(dogs) {
  const filterMode = document.getElementById("good-dog-filter");
  const topBar = document.getElementById("dog-bar");
  const dogInfo = document.getElementById("dog-info");
  while (topBar.hasChildNodes()) {
    topBar.removeChild(topBar.lastChild);
  }
  if (filterMode.textContent.split(": ")[1] == "OFF" || !dogInfo.lastChild) {
    dogs.forEach(dog => displayDog(dog));
  } else {
    dogs.forEach(function(dog) {
      if (document.querySelector("#dog-info button").textContent.split(" ")[0] == 'Bad' && !dog.isGoodDog) {
        displayDog(dog);
      } else if (document.querySelector("#dog-info button").textContent.split(" ")[0] == 'Good' && dog.isGoodDog) {
        displayDog(dog);
      }

    });
  }

}

function displayDog(dog) {

  const topBar = document.getElementById("dog-bar");
  const dogSpan = document.createElement("span");
  dogSpan.textContent = dog.name;
  dogSpan.addEventListener('click', function(event) {
    event.preventDefault();
    showDog(dog);
  })
  topBar.appendChild(dogSpan);

}

function showDog(dog) {
  const dogDiv = document.getElementById('dog-info');
  while (dogDiv.hasChildNodes()) {
    dogDiv.removeChild(dogDiv.lastChild);
  }
  const dogPic = document.createElement("img");
  dogPic.src = `${dog.image}`;
  const dogName = document.createElement("h2");
  dogName.textContent = dog.name;
  const dogButton = document.createElement("button");
  dogButton.addEventListener('click', function(ev) {
    executeFilter(ev, dog);
  });
  if (dog.isGoodDog) {
    dogButton.textContent = "Good Dog!";
  } else {
    dogButton.textContent = "Bad Dog!";
  }
  dogDiv.appendChild(dogName);
  dogDiv.appendChild(dogPic);
  dogDiv.appendChild(dogButton);
  loadDogs();
}
