let url = window.location;
const token = new URLSearchParams(url.search).get('token');

const cors = "http://cors-anywhere.herokuapp.com/";
console.log(token);

const jsonData = sessionStorage.getItem('rowData');
const parsedData = JSON.parse(jsonData);
console.log(parsedData);


let uuid = parsedData.uuid;
// Populate input fields with existing data
// Replace with actual customer data
uuid.value = parsedData.uuid;
first_name.value = parsedData.first_name;
last_name.value = parsedData.last_name;
street.value = parsedData.street;
address.value = parsedData.address;
city.value = parsedData.city;
state.value = parsedData.state;
email.value = parsedData.email;
phone.value = parsedData.phone;

let update = document.getElementById("update");
update.onclick = () => {

    let obj = {
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "street": document.getElementById("street").value,
        "address": document.getElementById("address").value,
        "city": document.getElementById("city").value,
        "state": document.getElementById("state").value,
        "email": document.getElementById("email").value,
        "phone": document.getElementById("phone").value
}
console.log(obj);

    updateCust()

function updateCust() {
    const apiUrl = 
    `${cors}https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=` + encodeURIComponent(uuid);
  
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
          alert('Customer updated successfully');
          window.location.href = `/customer_list/customerlist.html?token=${token}`;
        } else {
          console.error('Failed to create customer');
        }
      })
        .catch (error => {
        console.error('An error occurred:', error);
      });
  }
}