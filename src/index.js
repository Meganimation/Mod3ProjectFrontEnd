const addBtn = document.querySelector('#new-bread-btn')
const breadForm = document.querySelector('.container')
const breadCollection = document.getElementById('bread-collection')







let addbread = false
addBtn.addEventListener('click', () => {

  addbread = !addbread
  if (addbread) {
    breadForm.style.display = 'block'
  } else {
    breadForm.style.display = 'none'
  }
})


function fetchBreads()  {
  fetch('http://localhost:3000/breads')
  .then(resp => resp.json())
  .then(renderBreads)
}

function fetchComments()  {
  fetch('http://localhost:3000/comments')
  .then(resp => resp.json())
  .then(renderBreads)
}


// breads[0].comments[0].content
//  <p>"${bread.comments[0].content}"</p>

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
   
    <button class="add-btn">Add a Comment!</button>
    <button class="delete-btn">Delete Bread?</button>
    </div>
    </div>
    </div>
  `
  })



  
  function breadcomments(bread)   {
  return bread.comments.map(function (comment)
  { 
    for (i = 0; i < comment.content.length; i++)
     return `<li><button class="butty" data-id=${comment.id}> - ${comment.content}</button></li>`
  })
 } 
}


fetchBreads()
fetchComments()



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
  
  const commentbutton = event.target.className === "add-btn"
  const delbutton = event.target.className === "delete-btn"
  const newbutton = event.target.className === "butty"

  if (commentbutton) {
    const backtext = document.querySelector('.flip-card-back')
    var person = prompt("Please leave a useless comment.", "Useless comment.");

     if (person == null || person == "")  {
      cancel 
    } 
       else {
        txt = "Your comment '" + person + "' is almost appreciated.";
    }
        txtalert =alert(txt)
         postComments(person)
  }


  if (event.target.className === "butty") 
     {
       event.preventDefault()
       console.log('hi!') 
       var person = prompt("Hit Enter to Update the comment, or Cancel to Delete", "Enter Here");

   if (person == null || person == "") {
   txt = "Okay inabit m8."
   let id = event.target.dataset.id
     fetch(`http://localhost:3000/comments/${id}`, {
     method: 'DELETE',
     headers: {
    'Content-Type': 'application/json',
    },
    })
    .then(resp => resp.json)
    .then(fetchBreads)
  }
   else {
    txt = "Your comment '" + person + "' is almost appreciated.";
  }
   updateComments(person)
}


    else if (event.target.className === "delete-btn") {
      event.preventDefault()
     
      let id = event.target.parentElement.parentElement.parentElement.dataset.id
        if (id < 11) {
        alert('You cannot delete other peoples posts!') }
      else {
      alert("Task failed successfully!")

      fetch(`http://localhost:3000/breads/${id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json)
    .then(fetchBreads)
  }}



})




    function openForm() {
      document.getElementById("myForm").style.display = "block";
    }
    
    function closeForm() {
      document.getElementById("myForm").style.display = "none";
    }


  if (person == null || person == "") {
    txt = "Okay inabit m8.";
  } else {
    txt = "Your comment '" + person + "' is almost appreciated.";
  }
  txtalert =alert(txt)
  postComments(person)
  
  


function updateComments(person) {
 // let id = event.target.parentElement.parentElement.parentElement.dataset.id
    
  let id = event.target.dataset.id

  return fetch(`http://localhost:3000/comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      content: person,   
    })
  })
    .then(resp => resp.json())
    .then(fetchBreads)

}



function postComments(person) {
  let id = event.target.parentElement.parentElement.parentElement.dataset.id
 
   return fetch(`http://localhost:3000/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
    bread_id: id,
    content: person,   
     })
     })
    .then(resp => resp.json)
    .then(fetchBreads)
}


