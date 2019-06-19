document.addEventListener("DOMContentLoaded", () => {
  getDogs().then(dogs => showDogs(dogs));
  addListeners();
});

const dogUrl = "http://localhost:3000/pups";

function addListeners() {
  const filterBtn = document.getElementById("good-dog-filter");
  filterBtn.addEventListener("click", e => {
    e.preventDefault();
    toggleFilterDogs();
  });
}

function toggleFilterDogs() {
  const filterBtn = document.getElementById("good-dog-filter");
  if (filterBtn.innerText.includes("OFF")) {
    filterBtn.innerText = "Filter good dogs: ON";
    updateDogBar();
  } else {
    filterBtn.innerText = "Filter good dogs: OFF";
    updateDogBar();
  }
}

function getDogs() {
  return (
    fetch(dogUrl)
      .then(res => res.json())
      // .then(dogs => showDogs(dogs))
      .catch(err => console.log(err))
  );
}

function showDogs(dogs, filter = false) {
  let dogBar = document.getElementById("dog-bar");
  dogBar.innerHTML = "";
  if (filter) {
    dogs.filter(dog => dog.isGoodDog).forEach(dog => showDog(dog));
  } else {
    dogs.forEach(dog => showDog(dog));
  }
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

  dogSpan.appendChild(dogName);
  dogDiv.appendChild(dogSpan);
}

function toggleIsGoodDog(dog, button) {
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
    toggleIsGoodDog(dog, button);
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

function updateDogBar() {
  const filterBtn = document.getElementById("good-dog-filter");
  if (filterBtn.innerText.includes("OFF")) {
    getDogs().then(dogs => showDogs(dogs));
  } else {
    getDogs().then(dogs => showDogs(dogs, true));
  }
}
