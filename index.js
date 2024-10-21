let cus=localStorage.getItem('user_id')
let t=localStorage.getItem('token');






async function get(){
      
  let x= await fetch('https://normad-bakend.vercel.app/event/review/')
  let data=await x.json()

  const paren = document.getElementById('slider2')


data.forEach((rv) => {
const li=document.createElement('li')


let customerid=rv.customer
console.log(customerid)
rvname(customerid)







async function rvname(customerid){
  const res =await  fetch(`https://homeper-backend.vercel.app/customer/${customerid}/`);
    const data =await  res.json();

   
  let  name= data.user
   


   li.innerHTML = `
       
            <div class="card shadow w-20">
              
                   <img src="https://res.cloudinary.com/dk2vgd0dv/image/upload/v1723566992/samples/landscapes/nature-mountains.jpg" class="card-img-top" loading="lazy" alt="...">
                 
                <div class="card-body d-flex flex-column flex-md-row">
                    <div class="flex-grow-1">
                        <strong>${rv.textreview}</strong>
                        <p>personal ratting:  ${rv.ratting}⭐</p>

                        <p class="card-text">${name}</p>
                    </div>
                     
                   
                 
                </div>
                
                
                
            </div>
       


               `
   paren.appendChild(li)

}


})





  
    }

  
get()


     
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
  const authenticbar=document.getElementById('authenticbar')
  authenticbar.innerHTML=`
  <a href="login.html" class="btn btn-dark text-white">Login</a> <a href="signup.html" class="btn btn-primary ">Signup</a>

  `
  
  }





 async function getre(){
    let x= await fetch('https://normad-bakend.vercel.app/event/list/')
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
        div.classList.add('carousel-item', 'sliderss',"landerim",'d-flex','flex-wrap');
        div.innerHTML = `
            <div class="d-flex flex-wrap align-items-center justify-content-center col-lg-12 col-sm-12 col-md-12 ">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-7 col-12 order-md-1 order-2">
                            <h4 class="m-3">${data.location}<br /></h4>
                            <p>${data.Description.slice(0, 250)}...More</p>
                            <h4><i class="fa-solid fa-calendar-days"></i> ${data.traveldate}</h4>
                           <a href="Details.html?dataid=${data.id}" class="btn btn-warning my-5">Book Now</a>
                        </div>
                        <div class="col-md-5 col-12 order-md-2 order-1">
                            <img  src="https://res.cloudinary.com/dk2vgd0dv/${data.image}" class="mx-auto img-fluid" alt="slide" />
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
  

