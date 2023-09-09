const URL = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyFormCont = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.getElementById('toy-collection')
let addToy = false

// YOUR CODE HERE

toyForm.addEventListener('submit',function(e){
  e.preventDefault();
  let toyName = e.target.children.name.value
  let toyImgUrl = e.target.children.image.value
  e.target.children.name.value = ''
  e.target.children.image.value = ''
  createNewToy(toyName,toyImgUrl)
  .then(json => createToyCard(json))
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormCont.style.display = 'block'
    // submit listener here
  } else {
    toyFormCont.style.display = 'none'
  }
})

function thatsSoFetch(){
  fetch(URL)
  .then(res => res.json())
  .then(json => {
    console.log(json)
     createToyCards(json)
  })
}

function createToyCards(toys){
  for(let i = 0;i < toys.length;i++){
    let toy = toys[i];
    createToyCard(toy)
    }
}

function createToyCard(toy){
  let toyDivCard = document.createElement('div')
  toyDivCard.className = 'card' 
  let toyh2 = document.createElement('h2')
  toyh2.innerText = toy.name
  let toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes + " Likes";
  let toyLikeButton = document.createElement('button')
  toyLikeButton.className = 'toy-btn'
  toyLikeButton.innerText = "Like 💖"
  toyLikeButton.addEventListener('click', function(){
    toy.likes++
    fetch(URL + "/" + toy.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: toy.name, image: toy.image, likes: toy.likes})
    })
    .then(res => res.json())
    .then(json => {
      toyLikes.innerText = toy.likes + " Likes";
    })
  })
  toyCollection.appendChild(toyDivCard)
  toyDivCard.appendChild(toyh2)
  toyDivCard.appendChild(toyImg)
  toyDivCard.appendChild(toyLikes)
  toyDivCard.appendChild(toyLikeButton)
}

function createNewToy(name,url){
  return fetch(URL,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, image: url, likes: 0})
  })
  .then(res => res.json())
}

// function addLike(toy, toyLikes){
//   toy.likes++
//   fetch(URL + "/" + toy.id, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({name: toy.name, image: toy.image, likes: toy.likes})
//   })
//   .then(res => res.json())
//   .then(json => {
//     toyLikes.innerText = toy.likes + " Likes";
//   })
// }

thatsSoFetch()