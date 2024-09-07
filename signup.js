function getvalue(id) {
    return document.getElementById(id).value;
}



const handlelogin=(event)=>{
    event.preventDefault()
    const username=getvalue("loginusername")
    const password=getvalue('loginpassword')

    console.log(username,password)


    fetch("http://127.0.0.1:8000/account/registration/login/",{

        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({username,password}),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        console.log(data.token,data.user_id)
        if(data.token && data.user_id){  
        localStorage.setItem("token",data.token);
        localStorage.setItem("user_id",data.user_id);
        // localStorage.setItem("customer", JSON.stringify(data.customer))
        window.location.href="index.html"

        }
    });
   



}




function getvalue(id) {
    return document.getElementById(id).value;
}


async function handleregistration(event) {
    event.preventDefault();

    const first_name = getvalue("first_name");
    const last_name = getvalue("last_name");
    const username = getvalue("username");
    const email = getvalue("email");
    const password = getvalue("pass");
    const confirm_password = getvalue("againpass");
  

    const info = {
        first_name,
        last_name,
        username,
        email,
        password,
        confirm_password,
    };

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";

        // Validate password format (example)
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            // Password format is valid
            console.log(info);

            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirm_password);
          

            fetch("http://127.0.0.1:8000/account/registration/newuser/", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = 'login.html'
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('error').innerText = "An error occurred during registration.";
            });

        } else {
            
            document.getElementById('error').innerText = "Password must be minimum 8 characters with at least one number, one alphabet, and one special character.";
        }
    } else {
       
        alert('Passwords must match.');
        document.getElementById('error').innerText = "Passwords must match.";
    }
}


