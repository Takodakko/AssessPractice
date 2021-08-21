// document.addEventListener('DOMContentLoaded', () => {
//     // console.log('anything')
//   const title = document.createElement('h1');
//   title.innerText = 'Uncles';
//   document.querySelector('body').appendChild(title);
  
//   const request = new XMLHttpRequest()
//   //console.log(request, "request")
//   request.open('GET', '/api', true)
//   request.send()
//   request.onload = function() {
//     //   console.log(request.status, "this.status")
//     if (request.status >= 200 && request.status < 400) {
//         // console.log(request.response);
//       const resp = JSON.parse(request.response);

// // handleGet = function() {
// //     fetch('/sightings/getBirds')
// //     .then((data) => data.json())
// //     .then((data) => this.setState({birdLists: data})) 
// //         }  
       
//     // console.log(resp);
//       const maindiv = document.createElement('div');
//       maindiv.innerText = 'Posts';
//       document.querySelector('body').appendChild(maindiv);
//       for (let i = 0; i < resp.length; i++) {
//         maindiv.innerHTML += `<span>${resp[i].name}</span><br>
//         <span>${resp[i].age}</span><br>
//         <span>${resp[i].intro}</span><br><br>`
//         // console.log(resp[i], "resp[i]")
//       }
// }
// }
// // request.onerror()
// })

document.addEventListener('DOMContentLoaded', () => {
    // console.log('anything')
  const title = document.createElement('h1');
  title.innerText = 'Uncles';
  document.querySelector('body').appendChild(title);
  
  
    fetch('/api')
    .then((data) => data.json())
    .then((resp) => {
        const maindiv = document.createElement('div');
        maindiv.innerText = 'Posts';
        document.querySelector('body').appendChild(maindiv);
        for (let i = 0; i < resp.length; i++) {
          maindiv.innerHTML += `<div id=${resp[i]._id}><span>${resp[i].name}</span><br>
          <span>${resp[i].age}</span><br>
          <span>${resp[i].intro}</span><br>
          <button id=${resp[i]._id} class='delete'>delete</button><button id=${resp[i]._id} class='edit'>edit</button>
          <br><br></div>`
        }
    })
    .catch((err) => {
        console.log(err, "error")
    })


    document.getElementById('post').addEventListener('click', () => {
      let name = document.getElementById('name').value
      const age = document.getElementById('age').value
      const intro = document.getElementById('intro').value
      fetch('/api', {
          method: 'POST',
          headers: {
                'Content-Type': 'Application/JSON'
              },
          body: JSON.stringify({name: name, age: age, intro: intro})
  
      })
      .then((data) => data.json())
      .then((data) => {
          document.getElementById('name').innerHTML = '';
          console.log("success")})
      .catch((err) => {
          console.log(err, "error")
      })
  })
  
  //const deleteBtn = document.getElementsByClassName('delete')
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {

        console.log(e.target.parentNode, 'eventPARENT')
        const id = e.target.id;
        fetch(`/api/${id}`, {
          method: 'DELETE',
          headers: {
                'Content-Type': 'Application/JSON'
              }
      })
      .then(res => res.json())
      .then((jsondata) => {
        // console.log(jsondata, 'jsonData')
        console.log(`${jsondata.name} deleted`)
        const removedUncle = e.target.parentNode;
        removedUncle.remove();
      })
      .catch((err) => console.log(err, 'Failed to delete!'))
    }
  })

  document.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit')) {
         showForm();
         const editDiv = document.getElementById('edit-form')
        //  console.log(e.target.id)
         editDiv.setAttribute('data-id', e.target.id);
         editDiv.style.display = 'block';
      }
  })

  document.addEventListener('click', (e) => {
    if (e.target.id === 'submit') {
      let newName = document.getElementById('newName').value;
      let newAge = document.getElementById('newAge').value;
      let newIntro = document.getElementById('newIntro').value;
      // console.log(newName, 'newName')
      // console.log(newAge, 'newAge')
      // console.log(newIntro, 'newIntro')
      const editId = document.getElementById('edit-form').getAttribute('data-id')
      const body = {
        name: newName, 
        age: newAge,
        intro: newIntro,
        _id: editId
      }

      // console.log(editEdit)
      fetch(`/api/${editId}`, {
       method: 'PUT',
       headers: {
             'Content-Type': 'Application/JSON'
           },
       body: JSON.stringify(body)
       })
       .then((data) => data.json())
       .then((data) => {
           console.log("success")
           const editDiv = document.getElementById('edit-form')
           editDiv.style.display = 'none'})
       .catch((err) => {
           console.log(err, "error")
       })
     //  newName.setAttribute('placeholder', )
     //   const parent = e.target.parentNode;
       

    }
  })
})


const showForm = () => {
  const editDiv = document.getElementById('edit-form')
  editDiv.innerHTML = 
  `<div>Edit Form:
    <label>Name: <input id="newName"/></label>
    <label>Age: <input id="newAge"/></label>
    <label>Intro: <input id="newIntro"/></label>
    <button id="submit">Submit changes</button>
  </div>`
  // let nameInput = document.createElement('input');
  // nameInput.innerText('New Name: ');
  // editDiv.append(nameInput)
  // // nameInput.setAttribute('placeholder', )
  // let ageInput = document.createElement('input');
  // editDiv.append(ageInput)
  // let introInput = document.createElement('input');
  // editDiv.append(introInput)
  editDiv.style.display = 'none';
  return;
}