
     
if (localStorage.getItem('user_id') && localStorage.getItem('token'))
    {
    
  


detailtour()
rv()




    }
    else
    {
        
    
    
    window.location.href = 'login.html';  
    }




async function detailtour(){
    const k = new URLSearchParams(window.location.search).get("dataid");
    console.log(k);
    let x= await fetch(`https://normad-bakend.onrender.com/event/list/${k}`)
    let data=await x.json()
    console.log(data)

    const parent = document.getElementById('services');
    
    
        console.log(data)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="mask d-flex align-items-center justify-content-center">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-7 col-12 order-md-1 order-2">
                            <h4 class"punch">${data.location}</h4>
                            <p>${data.Description}</p>
                            <h4><i class="fa-solid fa-calendar-days"></i> ${data.traveldate}</h4>
                            <div class="d-flex align-items-center d-flex align-items-center"><p>People Limit:${data.people_limit}</p></div>
                           <div class="d-flex align-items-center"> Cost: ${data.cost}$ </div>
                           <p>Available seats: ${data.people_limit - data.people.length}</p>

                       <div class="d-flex justify-content-between">
                           <div class="d-flex justify-content-center gap-4">
                             <button  onclick="BookTravel(event)" class="button-lick"> Book</button>
                               <a href="Chatting.html?dataid=${data.id}" class="btn chatbtn">Discussion</a>
                          
                             </div>
                             <div class="d-flex   gap-2">
                               <a type="button" data-bs-toggle="modal"  data-bs-target="#exampleMod" class="btn btn-success">Review</a>
                             <a  type="button" data-bs-toggle="modal"  data-bs-target="#exampleModal" class="btn btn-primary">Share</a>
                             </div>

                        </div> 

                        </div>
                        <div class="col-md-5 col-12 order-md-3 order-1">
                            <img src="https://res.cloudinary.com/dk2vgd0dv/${data.image}" class="mx-auto img-fluid" alt="slide" />
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        parent.appendChild(div);
}







function getvalue(id) {
    return document.getElementById(id).value;
}
async function BookTravel(event) {
    event.preventDefault()
    const k = new URLSearchParams(window.location.search).get("dataid");
   
   
    let x= await fetch(`https://normad-bakend.onrender.com/event/list/${k}`)
    let d=await x.json()
    const userId = localStorage.getItem("user_id");  
    
    console.log(d.people)
    
  
    

    if (d.people.includes(parseInt(userId))) {
        alert('you already booked the travelplan')
        return
    } 
    

    if(d.people.length===d.people_limit)
        {
            alert('The travel plan is full pack.Better luck next time')
            return
        }
    
    
    console.log(k)
   
    console.log(userId)
   
    
           



    const formData = {
        user_id: userId
    };
    console.log(formData,k)
    try {
        const response = await fetch(`https://normad-bakend.onrender.com/event/list/${k}/addpeople/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
     
        
        let data = await response.json();
        console.log(data);
        console.log('You booked the tour!');
        alert('Congratulations! For your upcoming adventure');
       
        
    } catch (error) {
        console.error('Error booking travel:', error);
        alert('Error booking travel. Please try again.');
    }
}






async function ShareTravel(event) {
    event.preventDefault()
    const k = new URLSearchParams(window.location.search).get("dataid");
   
   
    let x= await fetch(`https://normad-bakend.onrender.com/event/list/${k}`)
    let d=await x.json()
    const userId = localStorage.getItem("user_id");  
    
    console.log(d.people)

    
    

    if (d.people.includes(parseInt(userId))) {
        alert('you already booked the travelplan')
        
    } 
    

    if(d.people.length===d.people_limit)
        {
            alert('The travel plan is full pack.Better luck next time')
            return
        }
    
    
    console.log(k)
   
    console.log(userId)
   
    
           

   const peoplelimit= getvalue('limit')
   const text= getvalue('text')
   const vacancy= d.people_limit - d.people.length
   if(vacancy===peoplelimit)
    {
        alert('people Limit cross,Try next Time Bro')
    }

  
    const formData = {
        peoplelimit:peoplelimit,
        text: text,
        share: k,
       
     };
    console.log(formData,k)
    try {
        const response = await fetch(`https://normad-bakend.onrender.com/sharetravel/join/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
     
        
        let data = await response.json();
        console.log(data);
        console.log('You share the tour!');
        alert('Thanks for sharing adventure');
       
        
    } catch (error) {
        console.error('Error booking travel:', error);
        alert('Error sharing travel. Please try again.');
    }
}










async function Postreview(event) {
    event.preventDefault()
    const k = new URLSearchParams(window.location.search).get("dataid");
   
   
    let x= await fetch(`https://normad-bakend.onrender.com/event/list/${k}`)
    let d=await x.json()
    const userId = localStorage.getItem("user_id");  
    
    console.log(d.people)

    
    

    if (d.people.includes(parseInt(userId))) {
        
        
    } 
    else{
        alert('you stll donot take the plan ,So you cannot review')
        return
    }
    

    
    
    console.log(k)
   
    console.log(userId)
   
    
           

   const ratting= getvalue('ratting')
   const textrv= getvalue('textrv')


  
    const formData = {
        ratting: ratting,
        textreview: textrv,
        travelname: k,
        reviewer:[userId]
       
       
     };
    console.log(formData,k)
    try {
        const response = await fetch(`https://normad-bakend.onrender.com/event/review/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
     
        
        let data = await response.json();
        console.log(data);
        console.log('You Give a review of the tour!');
        alert('Thanks for sharing your review');
       
        
    } catch (error) {
        console.error('Error review travel:', error);
        alert('Error sharing travel review. Please try again.');
    }
}




async function rv()
{
    const parent=document.getElementById('ourslides')
    const k = new URLSearchParams(window.location.search).get("dataid");

    const response= await fetch(`https://normad-bakend.onrender.com/event/review/?travelname=${k}`)
    const data=await response.json()
    console.log(data)
    data.forEach(element => {
        console.log(element)
        const li=document.createElement('li')
        name()
        async function name()
        { 
        const response= await fetch(` https://normad-bakend.onrender.com/account/registration/${element.reviewer[0]}/`)
         const res=await response.json()    
        
    
    li.innerHTML=
    ` 
      <div class="card border-0">
          <div class="ratio ratio-1x1">
              <img src="https://res.cloudinary.com/dk2vgd0dv/image/upload/v1723566997/samples/balloons.jpg" class="card-img-top" loading="lazy" alt="...">
          </div>
          <div class="card-body p-0 pt-2">
              <div class="d-flex">
                  <h4 class="flex-grow-1 h5 p-2">${element.textreview}</h4>
                  <p class="px-2 p-3">${element.ratting}⭐</p>
              </div>
              <p class="card-text p-3">${res.username}</p>
          </div>
      </div>
  `
        }
        parent.append(li)
});
} 


function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
 
    
    
    window.location.href = 'login.html';  
  }
  