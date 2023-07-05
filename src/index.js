let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded",getToys)
document.querySelector(".add-toy-form").addEventListener("submit", function(event){
  console.log("Hello")
  event.preventDefault()
  const imageLoc = event.target.image.value
  const nameValue = event.target.name.value
  sendData(imageLoc,nameValue)
})

function getToys(){
  fetch("http://localhost:3000/toys").then(resp => resp.json()
  .then(data => makeCard(data)))
  
}

function sendData(source,name){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },  
  body: JSON.stringify({
    "name": `${name}`,
    "image": `${source}`,
    "likes": 0
  })})
  
}



function makeCard(array){
  array.forEach(element => {
    const card = document.createElement("div")
    card.classList = "card"
    card.innerHTML = `
    <h2>${element["name"]}</h2>
    <img src="${element["image"]}" class="toy-avatar" />
    <p>${element["likes"]}</p>
    <button class="like-btn" id="[toy_id]">Like ❤️</button>`

    card.querySelector(".like-btn").addEventListener("click", () => {
      element["likes"] = element["likes"] + 1
      card.querySelector("p").textContent = element["likes"]
      updateLikes(element)
    })
    console.log(element["name"])
    document.querySelector("#toy-collection").appendChild(card)
  });
}
//can't figure patch yet
function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
  method: "PATCH",
  headers:{
  "Content-Type": "application/json",
  "Accept": "application/json"
},
body: JSON.stringify(toyObj)
  
  },
  console.log(toyObj.id)
)}


    
