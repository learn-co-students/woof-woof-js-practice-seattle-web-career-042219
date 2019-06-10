const URL = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', (event) => {
    main();
});



document.contentLoaded
function main(){
    loadDogs();
    activateFilter();
}



function loadDogs(){
    fetch(URL)
    .then(resp => resp.json())
    .then (pups =>{
        
        displayPups(pups)
    })
}

function displayPups(pups){
    pups.forEach(pup =>{
        displayPup(pup)
    })
}

function displayPup(pup){
    
    div = document.getElementById('dog-bar')
    let span = document.createElement('span')
    
       
    div.appendChild(span)
    
    
    span.textContent = pup.name
   

    span.addEventListener('click', () =>{
        showDog(pup, span)
    })
}

function showDog(pup, span){
    
    container = document.getElementById('dog-info')
    
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    let img = document.createElement('IMG')
    let header = document.createElement('h2')
    let btn = document.createElement('button')

    container.appendChild(img)
    container.appendChild(header)
    container.appendChild(btn)

    img.src = pup.image
    header.textContent = pup.name
    if (pup.isGoodDog === true){
        btn.textContent =  'Good Dog!'
        }
    else{
        btn.textContent = 'Bad Dog!'
    }
    btn.addEventListener('click', () =>{
        changeStatus(pup, btn)
        })
}


function changeStatus(pup, btnElement){
    
    console.log(btnElement)
    if (pup.isGoodDog === true){
        btnElement.textContent =  'Bad Dog!'
        pup.isGoodDog = false 
        }
    else{
        btnElement.textContent = 'Good Dog!'
        pup.isGoodDog = true 
    }

    fetch(URL + '/' + pup.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pup)
      })
      .then(res => res.json())
      .then(json => {
        console.log('toggle success:', json)
    
      })

}

function activateFilter(){

    btn = document.getElementById('good-dog-filter')
    console.log(btn)
    btn.addEventListener('click', () => {
        filter(btn)
      })
          
}

function filter(btn){
    console.log('click!')
    if (btn.textContent === "Filter good dogs: OFF"){
        btn.textContent =  "Filter good dogs: ON"
        }
    else{
        btn.textContent = "Filter good dogs: OFF"
    }
    
}

