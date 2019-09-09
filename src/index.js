const addBtn = document.querySelector('#new-bread-btn')
const breadForm = document.querySelector('.container')
let addbread = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addbread = !addbread
  if (addbread) {
    breadForm.style.display = 'block'
  } else {
    breadForm.style.display = 'none'
  }
})


function fetchBreads(){
  fetch('http://localhost:3000/breads')
  .then(resp => resp.json())
  .then(renderBreads)
}

function fetchComments(){
  fetch('http://localhost:3000/comments')
  .then(resp => resp.json())
  .then(renderComments)
}

// breads[0].comments[0].content
//  <p>"${bread.comments[0].content}"</p>
const breadCollection = 
document.getElementById('bread-collection')
function renderBreads(breads) {
  
  breadCollection.innerHTML = ""
  breads.forEach(function (bread) {

    console.log(bread)
    breadCollection.innerHTML += `
    
    <div class="flip-card" data-id=${bread.id}>
    
    <div class="flip-card-inner">
 
      <div class="flip-card-front">
      <img src="${bread.imgurl}" class="bread-avatar" />
      <h2>${bread.name}</h2>
      <p>${bread.breadtype}</p>
      </div>
      <div class="flip-card-back">
      <h3> <u> Previous Comments </u> </h3>
       <p>${breadcomments(bread).join("")}</p>
   
      <button class="like-btn">bread!</button>
      <button class="delete-btn">bread?</button>
      </div>
    </div>
  </div>
  `

  })
  
function breadcomments(bread) {

  return bread.comments.map(function (comment)
  { 
    return `<p>${comment.content}</p>`
  }
  )} 


  // breads.forEach(function (bread) {
  //   i = 0
  //   console.log(bread.comments[0].content)
  //   document.getElementsByClassName('flip-card-back').innerHTML = `<p>"${bread.comments[0].content}"</p>`
  
  //   i++
  // })
}



fetchBreads()
// fetchComments()

const addbreadForm = document.querySelector('.add-bread-form')
addbreadForm.addEventListener('submit', function (event) {
  fetch('http://localhost:3000/breads/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: event.target.name.value,
      imgurl: event.target.imgurl.value,
      breadtype: event.target.breadtype.value
   
      
    })
  })
    .then(resp => resp.json())
    .then(renderBreads)
})


const addcommentForm = document.querySelector('.add-comment-form')
addbreadForm.addEventListener('submit', function (event) {
  fetch('http://localhost:3000/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `${event.target.content.value}`
      
    })
  })
    .then(resp => resp.json())
    .then(renderBreads)
})




  


breadCollection.addEventListener('click', function (event) {
  event.preventDefault()
  
  let commentbutton = event.target.className === "like-btn"
  let delbutton = event.target.className === "delete-btn"
  if (commentbutton) {
    alert('hi!')
    let id = event.target.parentElement.parentElement.parentElement.dataset.id
    back = document.querySelector('.flip-card-back')
    back.innerText = Comments.all}

// break

// fetch(`http://localhost:3000/breads/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: name
//       })
//     })
//     .then(response => response.json())
//     .then(renderBreads)
//   }

  else if (event.target.className === "delete-btn") {
    event.preventDefault()
    let id = event.target.parentElement.parentElement.parentElement.dataset.id
    alert("Task failed successfully!")

    fetch(`http://localhost:3000/breads/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json)
    .then(fetchBreads)
  }



})

function renderComments(comments) {
  breadCollection.innerHTML = ""
 comments.forEach(function (bread) {
    breadCollection.innerHTML += `<p>"${bread.comments[0].content}"</p>`  })}

    renderComments()


