const URL = "http://localhost:3000/pups";

document.addEventListener('DOMContentLoaded', () => {
    main();
})

function main() {
    const filter = document.getElementById('good-dog-filter');
    filter.addEventListener('click', toggleFilter);
    loadPups()
}

function toggleFilter(ev) {
    if (ev.target.textContent.split(": ")[1] == "OFF") {
        ev.target.textContent = "Filter good dogs: ON";
    } else {
        ev.target.textContent = "Filter good dogs: OFF";
    }
    loadPups();
}

function filter(ev, pup) {
    fetch(URL + `/${pup.id}`, {
        method: "PATCH", 
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({isGoodDog: !pup.isGoodDog})
    })
    .then(resp => resp.json())
    .then(json => {
        showPup(json());
    })
    .catch(err => {
        console.log(err)
    })
}

function loadPups() {
    fetch(URL)
    .then(resp => resp.json())
    .then(json => {
        displayPups(json)
    })
    .catch(err => {
        console.log(err)
    })
}

function displayPups(pups) {
    let pupFilter = document.getElementById('good-dog-filter');
    let topBar = document.getElementById('dog-bar');
    let pupInfo = document.getElementById('dog-info');
    while (topBar.hasChildNodes()) {
        topBar.removeChild(topBar.lastChild)
    }
    if (pupFilter.textContent.split(": ")[1] == "OFF" || !pupInfo.lastChild) {
        pups.forEach((pup) => displayPup(pup));
        } else {
            pups.forEach((pup) => {
                if (document.querySelector("#dog-info button").textContent.split(" ")[0] == 'Bad' && !pup.isGoodDog) {
                    displayPup(pup);
                } else if (document.querySelector('#dog-info button').textContent.split(" ")[0] == 'Good' && pup.isGoodDog) {
                    displayPup(pup);
                }
            });
    }
}

function displayPup(pup) {
    const pupBar = document.getElementById('dog-bar');
    const pupSpan = document.createElement('span');
    pupSpan.textContent = pup.name;
    pupSpan.addEventListener('click', (ev) => {
        ev.preventDefault();
        showPup(pup);
    })
    pupBar.appendChild(pupSpan);
}

function showPup(pup) {
    let container = document.getElementById('dog-info');
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    let img = document.createElement('img')
        img.src = `${pup.image}`
    let name = document.createElement('h2')
        name.textContent = pup.name
    let pupFilter = document.createElement('button')
    pupFilter.addEventListener('click', (ev) => {
        filter(ev, pup);
    });
    if (pup.isGoodDog) {
        pupFilter.textContent = "Good Dog";
    } else {
        pupFilter.textContent = "Bad Dog";
    }
    container.appendChild(name);
    container.appendChild(img);
    container.appendChild(pupFilter);
    loadPups();
}