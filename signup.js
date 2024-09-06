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



