let cus=localStorage.getItem('user_id')
let t=localStorage.getItem('token');

     
if (cus && t)
    {
    
  
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
  
  }
  else{
    const ui=document.getElementById('profileid')
  
  ui.innerHTML=
  `
  
  `
  
  }





 async function getre(){
    let x= await fetch('https://normad-bakend.onrender.com/event/list/')
    let data=await x.json()
    return data
}



async function loadservice() {
    let datas = await getre();
    const parent = document.getElementById('service');

    
    datas.forEach((data,index) => {
        index=index+1
        console.log(data,index)
        const div = document.createElement('div');
        console.log(typeof(index))
        div.classList.add('carousel-item', 'sliderss',"landerim");
        div.innerHTML = `
            <div class="mask d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-7 col-12 order-md-1 order-2">
                            <h4>${data.location}<br /></h4>
                            <p>${data.Description}</p>
                            <h4><i class="fa-solid fa-calendar-days"></i> ${data.traveldate}</h4>
                           <a href="Details.html?dataid=${data.id}" class="btn">Book Now</a>
                        </div>
                        <div class="col-md-5 col-12 order-md-2 order-1">
                            <img src="https://res.cloudinary.com/dk2vgd0dv/${data.image}" class="mx-auto img-fluid" alt="slide" />
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        parent.appendChild(div);
    });
}

loadservice();

function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
 
    
    
    window.location.href = 'login.html';  
  }
  

