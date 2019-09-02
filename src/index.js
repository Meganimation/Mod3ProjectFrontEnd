const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(renderToys)
}


const toyCollection = document.getElementById('toy-collection')
function renderToys(toys) {
  toyCollection.innerHTML = ""
  toys.forEach(function (toy) {
    toyCollection.innerHTML += `
   <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
        <button class="delete-btn">Delete</button>
   </div>
  `
  })
}

fetchToys()

const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener('submit', function (event) {
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(renderToys)
})


toyCollection.addEventListener('click', function (event) {
  let likebutton = event.target.className === "like-btn"
  let delbutton = event.target.className === "delete-btn"
  if (likebutton) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())
  }

  else if (delbutton) {
    let id = event.target.parentElement.dataset.id
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(fetchToys)
  }
})