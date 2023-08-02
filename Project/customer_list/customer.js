let url = window.location;
const token = new URLSearchParams(url.search).get('token');

const cors = "http://cors-anywhere.herokuapp.com/";
console.log(token);

const customerList = document.getElementById('customer-list');

  async function fetchCustomerData() {
    const apiUrl = `${cors}https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        displayCustomerData(data);
      } else {
        console.error('Failed to fetch customer data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  function displayCustomerData(customers) {
    customerList.innerHTML = ''; // Clear existing data

    customers.forEach(customer => {
      const row = document.createElement('tr');
      row.setAttribute("id",customer.uuid);
      row.innerHTML = `
        <td>${customer.first_name}</td>
        <td>${customer.last_name}</td>
        <td>${customer.street}</td>
        <td>${customer.address}</td>
        <td>${customer.city}</td>
        <td>${customer.state}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td class="action-column">
          <div class="action-buttons">
            <button class="edit-button" data-uuid="${customer.uuid}">Edit</button>
            <button class="delete-button" data-uuid="${customer.uuid}">Delete</button>
          </div>
        </td>
      `;
      customerList.appendChild(row);
    });
  }

  // Fetch and display customer data on page load
  fetchCustomerData();

  function attachDeleteHandlers() {
    let deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        let uuid = button.getAttribute('data-uuid');
        console.log(uuid);
        deleteCustomer(uuid);
      });
    });
  }

  function attachEditHandlers() {
    let editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        let uuid = button.getAttribute('data-uuid');
        console.log(uuid);
        editCustomer(uuid);
      });
    });
  }
  
  // Fetch and display customer data on page load
  fetchCustomerData().then(() => {
    attachDeleteHandlers();
    attachEditHandlers();
  });

  async function deleteCustomer(uuid) {
    const apiUrl = `${cors}https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=` + encodeURIComponent(uuid);
    console.log(uuid);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (true) {
        // Delete the corresponding row from the table
        let rowToDelete = document.getElementById(uuid);
        if (rowToDelete) {
          rowToDelete.remove();
          alert(`Deleted Customer with UUID:${uuid}`);
        }
      } else {
        console.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
function editCustomer(uuid) {
  let row = document.getElementById(uuid);
  let rowData = {
      "first_name": row.children[0].textContent,
      "last_name": row.children[1].textContent,
      "street": row.children[2].textContent,
      "address": row.children[3].textContent,
      "city": row.children[4].textContent,
      "state": row.children[5].textContent,
      "email": row.children[6].textContent,
      "phone": row.children[7].textContent,
      "uuid" : uuid
  }
  sessionStorage.setItem('rowData', JSON.stringify(rowData));
  window.location.href = `/update_customer/update.html?token=${token}`;
}



  
let createCustomer = document.getElementById("create-button")
createCustomer.onclick = () => {
    window.location.href = `/create_customer/createcustomer.html?token=${token}`;
}