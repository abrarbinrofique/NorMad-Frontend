let cus=localStorage.getItem('user_id')
let t=localStorage.getItem('token');

     
if (cus && t)
    {
    
        profiles()
        friendrequest()



    }
else
{
        
    window.location.href = 'login.html';  
}


const ui=document.getElementById('profileid')

  
ui.innerHTML=


`
 <a class="nav-link dropdown-toggle text-white " href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fas fa-user-circle"></i>
              </a>
              <ul id="profileid" class="dropdown-menu">
                <li><a class="dropdown-item " href="profile.html">Profile</a></li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" onclick="logoutuser()">Logout</a></li>
              </ul>
`







async function profiles(){
  userid=localStorage.getItem('user_id')
   const card=document.getElementById('profilecard')
   const re=await fetch(`https://normad-bakend.vercel.app/account/upgrade/?people=${parseInt(userid)}`)
  const d=await fetch (`https://normad-bakend.vercel.app/account/registration/${parseInt(userid)}/`)
  const m=await d.json()
  console.log(m)

   const data=await re.json()
   console.log(data)
  const div=document.createElement('div')
  div.classList.add('container','p-3','col-lg-6')
  console.log(data)
  div.innerHTML=
  `<div class="img-container">
  <img src="https://res.cloudinary.com/dk2vgd0dv/${data[0].image}" alt="">
</div>
<ul class="social-media">
    <li><a href="${data[0].fb}"><i class="fab fa-facebook fa-3x" style="color: #3b5998;"></i></a></li>
    <li><a href="${data[0].x}"><i class="fab fa-twitter fa-3x" style="color: #60a1e6;"></i></a></li>
    <li><a href="#"><i class="fab fa-instagram fa-3x" style="color: #c44848;"></i></a></li>
  </ul>
  <div class="user-info">
   <h2>${m.first_name} ${m.last_name}</h2>
   <h4>@${m.username}</h4>
    <h5>${data[0].bio}</h5>
    <span>${data[0].phone}</span>`

    card.append(div)
}








async function friendrequest()
{
  let k=localStorage.getItem('user_id')
  //  k=parseInt(k)
  const requestlist=document.getElementById('requestlist')
  const response= await  fetch(`https://normad-bakend.vercel.app/account/friendrequest/?to_user=${k}`)
  const data=await  response.json() 
  console.log(data)
  if (data.length === 0) {
     requestlist.innerHTML=
     `
      <h2 class="text-center heading text-dark">There is no request</h2>
     `
  } else {
      data.forEach(element => {

          let g=parseInt(element.from_user)
          findusername(g)
      async function findusername(g)
      {
         const who=await fetch (`https://normad-bakend.vercel.app/account/registration/${g}/`)

         const rel=await who.json()
         
      //    console.log(parseInt(rel.username))

          const div=document.createElement('div')
          div.classList.add('lists','justify-content-center','text-center')

          div.innerHTML=`
          <img class="propic" src="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png">
       ${rel.username} <button class="accept" onclick="accept(${element.id},${element.from_user})"> <i class="fas fa-check m-2"></i></button> <button class="remove" onclick="remove(${element.id},${element.from_user})"><i class="fas fa-times m-2"></i></button></div>
        `
        requestlist.append(div)
  }});
  }
} 













async function accept(k,l)
{
  let user=localStorage.getItem('user_id')
  console.log(k,l,user)
  const formData = {
      from_user: l,
      to_user:user,
  };
  console.log(formData,k)
  try {
      const response = await fetch(`https://normad-bakend.vercel.app/account/friendrequest/${k}/accept_request/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      });
   
      
      let data = await response.json();
      console.log(data);
      console.log('You added new friend');
      alert('Congratulations! For your new friend');
     
      
  } catch (error) {
      console.error('Error accept got trouble:', error);
      alert('Error accept trouble');
  }
}




async function remove(k,l)
{
  let user=localStorage.getItem('user_id')
  console.log(k,l,user)
  const formData = {
      from_user: l,
      to_user:user,
  };
  console.log(formData,k)
  try {
      const response = await fetch(`https://normad-bakend.vercel.app/account/friendrequest/${k}/remove_request/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      });
   
      
      let data = await response.json();
      console.log(data);
      console.log('You remove friend request');
      alert('ohhh! the request has been deleted');
     
      
  } catch (error) {
      console.error('Error request got trouble:', error);
      alert('Error delete trouble');
  }
}

document.getElementById('planForm').addEventListener('submit', addplan);

async function addplan(event) {

  
  event.preventDefault();

  let locat = document.getElementById('location').value;
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;
  let desc = document.getElementById('description').value; 
  let cos = document.getElementById('cost').value;
  let pic = document.getElementById('image').files[0];
  let limit = document.getElementById('peoplelimit').value;

  let formData = new FormData();
  formData.append('location', locat);
  formData.append('traveldate', date);
  formData.append('time', time);
  formData.append('Description', desc); 
  formData.append('cost', cos);
  formData.append('people_limit', limit);
  formData.append('image', pic); 

  try {
      const response = await fetch(`https://normad-bakend.vercel.app/event/list/`, {
          method: "POST",
          body: formData, 
      });

      let data = await response.json();
      console.log(data);
      alert('New tour plan added');
  } catch (error) {
      console.error('Error adding tour plan:', error);
      alert('Error in adding tour plan');
  }
}





document.getElementById('profileForm').addEventListener('submit', addprofileinfo);

async function addprofileinfo(event) {
    event.preventDefault();
    const re=await fetch(`https://normad-bakend.vercel.app/account/upgrade/?people=${parseInt(userid)}`)
    const data=await re.json()
    console.log(data)
    travelerid=data[0].id
    console.log(travelerid)
  let id=localStorage.getItem('user_id')
  let bio = document.getElementById('bio').value;
  let gender = document.getElementById('gender').value;
  let phone = document.getElementById('phone').value;
  let city = document.getElementById('city').value; 
  let fb = document.getElementById('fb').value;
  let img = document.getElementById('img').files[0];
  let x = document.getElementById('x').value;

  let formData = new FormData();
  formData.append('people',id)
  formData.append('image', img); 
  formData.append('bio', bio);
  formData.append('gender', gender);
  formData.append('phone', phone);
  formData.append('city', city); 
  formData.append('fb', fb);
  formData.append('x', x);
  console.log(img)

  if (travelerid)
  {
    const responsePut = await fetch(`https://normad-bakend.vercel.app/account/upgrade/${travelerid}/`, {
        method: "PUT",
        body: formData,
    });
    
    let dataPut = await responsePut.json();
    console.log(dataPut);
    alert('Your profile info has been updated via PUT.');
     
  }
  else
  {
    try {
        const response = await fetch(`https://normad-bakend.vercel.app/account/upgrade/`, {
            method: "POST", // or "PUT" based on your need
            body: formData,
        });

        let data = await response.json();
        console.log(data);
        alert('Your profile info has been updated via POST.');

    }
    catch (error) {
            console.error('Error upgrading profile info:', error);
            alert('Error in upgrading profile info.');
        }
    

  }


}


function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');

  
  
  window.location.href = 'login.html';  
}

