let url = window.location;
const cors = "http://cors-anywhere.herokuapp.com/";

const token = new URLSearchParams(url.search).get('token');
console.log(token);

let create = document.getElementById("create");
create.onclick = ()=> {
let obj = {
  "first_name": document.getElementById("first_name").value,
  "last_name": document.getElementById("last_name").value,
  "street": document.getElementById("street").value,
  "address": document.getElementById("address").value,
  "city": document.getElementById("city").value,
  "state": document.getElementById("state").value,
  "email": document.getElementById("email").value,
  "phone": document.getElementById("phone").value,
  } 
  console.log(obj);
  craeteCust(obj);
}

function craeteCust(customer) {
  const apiUrl = 
  `${cors}https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          {
            "first_name": document.getElementById("first_name").value,
            "last_name": document.getElementById("last_name").value,
            "street": document.getElementById("street").value,
            "address": document.getElementById("address").value,
            "city": document.getElementById("city").value,
            "state": document.getElementById("state").value,
            "email": document.getElementById("email").value,
            "phone": document.getElementById("phone").value
            }
        )
      })
      .then(res =>{
        return res;
      })
      .then(data => {
      if (data.ok) {
        alert('Customer created successfully');
        createForm.reset();
        window.location.href = `/customer_list/customerlist.html?token=${token}`;
      } else {
        console.error('Failed to create customer');
      }
    })
      .catch (error => {
      console.error('An error occurred:', error);
    });
}


const createForm = document.getElementById('create-form');

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    
  });