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
          <button id=${resp[i]._id} class='delete'>delete</button><button>edit</button>
          <br><br></div>`
        }
    })
    .catch((err) => {
        console.log(err, "error")
    })
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

document.addEventListener('click', (e) => {
const id = e.target.id;
  fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: {
          'Content-Type': 'Application/JSON'
        }
})

})