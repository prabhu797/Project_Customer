const cors = "http://cors-anywhere.herokuapp.com/";

let login = document.getElementById("login");
login.onclick = () => {
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;

    fetch(`${cors}https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "login_id": login_id,
          "password": password
        })
      })
      .then(response => {
      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const delayMs = retryAfterHeader ? parseInt(retryAfterHeader) * 1000 : 0; // Convert to milliseconds

        if (delayMs > 0) {
          console.log(`Received Retry-After header. Retrying after ${delayMs / 1000} seconds.`);
        }
    //     currentRetry++;
    //     setTimeout(makeRequest, delayMs);
    //   } else {
        return response.json();
      }
      return response.json();
    })
      .then(data => {
        if (data.access_token) {
            token = data.access_token;
          localStorage.setItem("access_token", data.access_token);
          window.location.href = `/customer_list/customerlist.html?token=${token}`;
        } else {
          alert("Authentication failed. Please check your credentials.");
        }
      })
      .catch(error => {
        console.error("Error during authentication:", error);
      });
    }