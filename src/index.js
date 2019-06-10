const URL = 'http://localhost:3000/pups'
let filter = false
document.addEventListener("DOMContentLoaded", ()=>{
    main()
})

function main() {
    loadPups()
    addBarFilter()
}

function loadPups(){
    fetch(URL)
    .then(response => {
        return response.json()
    })
    .then(json => {
        displayPups(json)
    });
}

function displayPups(json){

    // clear bar
    let bar = document.getElementById("dog-bar")
    while (bar.lastChild) {
        bar.removeChild(bar.lastChild)
    }

    if(filter == false) {
        json.forEach((pup)=> {
            addPupToBar(pup);
        })
    } else {
        json.forEach((pup)=> {
            if(pup.isGoodDog == true) {addPupToBar(pup)};
        })
    }
}

function addPupToBar(pup){
    let dogbar = document.getElementById("dog-bar")
    let span = document.createElement("span")
        span.textContent = pup.name
        span.addEventListener("click", ()=>{
            showPupDetails(pup)
        })
    dogbar.appendChild(span)
}

function showPupDetails(pup) {
    
    let info = document.getElementById("dog-info")
        img = document.createElement("img")
        h2 = document.createElement("h2")
        button = document.createElement("button")

    // clear div
    while (info.lastChild) {
        info.removeChild(info.lastChild)
    }

    h2.textContent = pup.name
    img.src = pup.image
    button.textContent = (pup.isGoodDog ? "Good Dog!" : "Bad Dog!")
    button.addEventListener("click", ()=>{
        changeDogGoodness(pup, button)
    })

    info.appendChild(img)
    info.appendChild(h2)
    info.appendChild(button)    
}

function changeDogGoodness(pup, button) {

    let payload = {isGoodDog: !pup.isGoodDog}
    let config = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }
    
    fetch(URL + '/' + pup.id, config)
    .then(res => res.json())
    .then(json => {
        pup.isGoodDog = !pup.isGoodDog
        button.textContent = (pup.isGoodDog ? "Good Dog!" : "Bad Dog!")
        loadPups()
    })

}

function addBarFilter(){
    let button = document.getElementById("good-dog-filter")
    button.addEventListener("click", ()=>{
        filter = !filter
        button.textContent = (filter ? "Filter good dogs: ON" : "Filter good dogs: OFF")
        loadPups()
    })
}