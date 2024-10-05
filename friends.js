let cus=localStorage.getItem('user_id')
let t=localStorage.getItem('token');
const k = new URLSearchParams(window.location.search).get("dataid")
     
if (cus && t)
    {
    
        profiles()
       
        mytravels()



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
   const re=await fetch(`https://normad-bakend.vercel.app/account/upgrade/?people=${parseInt(k)}`)
  const d=await fetch (`https://normad-bakend.vercel.app/account/registration/${parseInt(k)}/`)
  const m=await d.json()
  console.log(m)
   const data=await re.json()
   console.log(data)
  const div=document.createElement('div')
  div.classList.add('container','p-3','col-lg-6')
  console.log(data)
  if(data.length!==0){
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
    <span>${data[0].phone}</span>`}

    card.append(div)

  }

  

async function mytravels()
{

  const list= await fetch('https://normad-bakend.vercel.app/event/list/')
  const data=await list.json()
  const mylist=document.getElementById('mytravelist') 
  if (data.length===0)
  {
    mylist.innerHTML=
      `<h3 class="nolist">You List is empty</h3> `

  }
 else{

 
  data.forEach(element => {
  
    console.log(element)  
    
    if (element.people.includes(parseInt(k)))
      {
         
    const div=document.createElement('div')
    div.classList.add('col-sm-4', 'col-md-4', 'col-lg-4', 'card', 'text-dark', 'card-has-bg', 'click-col');
    div.style.backgroundImage = `url('https://res.cloudinary.com/dk2vgd0dv/${element.image}')`;
   
   div.innerHTML=
    ` 
   
   <div class="card-img-overlay d-flex flex-column">
    <div class="card-body">
     
       <h4 class="card-title mt-0 text-dark ">${element.location}</h4>
      <small class="nolist"><i class="far fa-clock"></i> ${element.traveldate}</small>
      <p class="nolist">$ ${element.cost} </p>
      <div class="mt-3 nolist">${element.Description.slice(0,30)}...</div>
      
     </div>
     
     <div class="card-footer">
      <div class="media">

       <a href="Details.html?dataid=${element.id}" class="btn chatbtn">Details</a>
      
     
    
</div>
     </div>
   </div>
 `

 mylist.appendChild(div)
      } 
  })
  
;


}
}









function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');

  
  
  window.location.href = 'login.html';  
}

