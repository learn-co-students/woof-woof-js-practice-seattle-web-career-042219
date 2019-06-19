document.addEventListener("DOMContentLoaded", () => {
  getDogs();
  addListeners();
});

const dogUrl = "http://localhost:3000/pups";
let filterDogsBool = false;

function addListeners() {
  let filterBtn = document.getElementById("good-dog-filter");
  filterBtn.addEventListener("click", e => {
    e.preventDefault();
    filterDogs();
  });
}

function getDogs() {
  fetch(dogUrl)
    .then(res => res.json())
    .then(dogs => showDogs(dogs))
    .catch(err => console.log(err));
}

function showDogs(dogs) {
  dogs.forEach(dog => showDog(dog));
}

function showDog(dog) {
  const dogDiv = document.getElementById("dog-bar");
  const dogSpan = document.createElement("span");

  const dogName = document.createElement("p");
  dogName.innerText = dog.name;

  dogSpan.addEventListener("click", e => {
    e.preventDefault();
    dogInfo(dog);
  });

  if (!filterDogsBool && dog.isGoodDog) {
    dogSpan.appendChild(dogName);
    dogDiv.appendChild(dogSpan);
  }
}

function toggleDog(dog, button) {
  dog.isGoodDog = !dog.isGoodDog;
  button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
}

function dogInfo(dog) {
  let infoDiv = document.getElementById("dog-info");
  infoDiv.innerHTML = "";

  let dogImg = document.createElement("img");
  dogImg.src = dog.image;

  let dogName = document.createElement("h2");
  dogName.innerText = dog.name;

  let pId = document.createElement("p");
  pId.innerText = dog.id;

  let button = document.createElement("button");
  button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  button.addEventListener("click", () => {
    toggleDog(dog, button);
    patchDog(dog);
  });

  infoDiv.appendChild(dogImg);
  infoDiv.appendChild(dogName);
  infoDiv.appendChild(pId);
  infoDiv.appendChild(button);
}

function patchDog(dog) {
  fetch(dogUrl + "/" + dog.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function filterDogs() {
  filterDogsBool = !filterDogsBool;
  let filterBtn = document.getElementById("good-dog-filter");
  filterBtn.innerText = filterDogsBool
    ? "Filter good dogs: ON"
    : "Filter good dogs: OFF";
  showDogs();
}
