let i=localStorage.getItem('user_id')
let d=localStorage.getItem('token')

if (i && d)

    {



      sharetravels()
      friends()


}
else
{
    window.location.href='login.html'
}


async function travelsdetails(k)
{
  let x= await fetch(`https://normad-bakend.vercel.app/event/list/${k}/`)
  let d=await x.json()
  return d
}

async function peopleinfo(l)
{
  let name=await  fetch(`https://normad-bakend.vercel.app/account/registration/${l}/`)
       
  let n= await name.json()
  return n
}

async function checkexist(g)
{

  const res=await fetch(`https://normad-bakend.vercel.app/sharetravel/join/${g}/`)
  let y=await res.json()
  console.log(y)
  let user=localStorage.getItem('user_id')
  if( y.travellersgroup.includes(parseInt(user)))
    {
      return 1
    }
  else{
    return 0
  }
}


async function checkmaineventexist(g)
{

  const res=await fetch(`https://normad-bakend.vercel.app/event/list/${g}/`)
  let y=await res.json()
  console.log(y)
  let user=localStorage.getItem('user_id')
  if( y.people.includes(parseInt(user)))
    {
      return 1
    }
  else{
    return 0
  }
}



async function sharetravels()
{

    const shares=document.getElementById('shares') 
    const res=await fetch("https://normad-bakend.vercel.app/sharetravel/join/")
    let data=await res.json()

    
    data.forEach(element => {
      console.log(element)
      console.log(element.peoplelimit); 
      console.log(element.travellersgroup.length); 
      
    let p=  element.peoplelimit-element.travellersgroup.length
    let k=parseInt(element.share)
 
   travelinfo()
   
    
    async function travelinfo(){
        
        let d=await  travelsdetails(k)
        let l=parseInt(element.shareby)
        let n=await  peopleinfo(l)
        const div = document.createElement('div')
      
        div.classList.add('col-lg-4','col-md-6','col-sm-12','d-flex', 'justify-content-center', 'sharediv');
        

    console.log(d)
    console.log(data)

    div.innerHTML=

    `   
        <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="https://res.cloudinary.com/dk2vgd0dv/${d.image}" alt="Avatar" style="width:300px;height:300px;">
            <h3>${d.location}</h3>
          </div>
          <div class="flip-card-back">
            <h1>${d.location}</h1>
            <h3>vacancy:${p}</h3>
            <h3>cost:${d.cost}$</h3>
            <p>${element.text}</p>
            <p class="highlighted-text"> Share By:${n.username}</p>
            <a href="Details.html?dataid=${k}" class="btn btn-warning joinbtn">Details</a>
            <button onclick="joinshare(${element.id},${element.share})" class="btn btn-success joinbtn">Join</button>
          </div>
        </div>
      </div> 
      `

    shares.append(div)




        
    }})}






async function  joinshare(k,l)
{


  console.log(k,l)
  const sub=await checkexist(k)
  const main=await checkmaineventexist(l)
 if (sub==0 && main==0)
  {
      

  const userId=localStorage.getItem('user_id')

  const formData = {
  user_id: userId
  }

console.log(formData,k)
try {
    const response = await fetch(`https://normad-bakend.vercel.app/sharetravel/join/${k}/sharetravel_add/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

      })

       let sharedata = await response.json();
       console.log(sharedata);
       console.log('You booked the tour!');
       alert('Congratulations! For your upcoming adventure');

      }
catch (error) {
console.error('Error booking travel:', error);
alert('Error booking travel. Please try again.');
}





  }
  else
  {
    alert('you already in the travel plan')
    return 
  }




}

function logoutuser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');

  
  
  window.location.href = 'login.html';  
}



async function send(k,l) {


  const formData = {
    to_user:parseInt(k)
    };
  
  console.log(formData)
  try {
     console.log(d)
      const sending = await fetch(`https://normad-bakend.vercel.app/account/friendrequest/${l}/send_request/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${d}`
          },
          body: JSON.stringify(formData)
  
        })
  
         let sharedata = await sending.json();
         console.log(sharedata);
         console.log('You send request!');
         alert('you send friend request');
  
        }
  catch (error) {
 
  
  }
  
}




async function friends()
{  const d=await fetch (`https://normad-bakend.vercel.app/account/registration/`)
  const my=await fetch (`https://normad-bakend.vercel.app/account/registration/${parseInt(i)}/`)
  
  const m=await my.json()
  const data=await d.json()
  const list=document.getElementById('list')
 
  data.forEach(element => {

   
    // console.log(element.id)
  
    if(m.friends.includes(element.id)||element.id===parseInt(i))
    {
    
    }
    else
    {
      console.log(element.id)
       async function requestheck()
         {  let matchFound = false;

       
  
          const ttt=await fetch(`https://normad-bakend.vercel.app/account/friendrequest/`)
          const h=await ttt.json()
           h.forEach(el => {
            console.log(el)
         

          if((el.from_user===parseInt(i) && el.to_user===(element.id)) || (el.from_user===(element.id) && el.to_user===parseInt(i)))
         {
           
           matchFound=true
          
           console.log(matchFound)
           return 
         }
          
        })


        
       if(!matchFound)
       {
          console.log(element)
          const div=document.createElement('div')
          div.classList.add('lists','justify-content-center','text-center','py-4')
    
          div.innerHTML=
          `
          <img class="propic" src="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png">
          <h4 class="mt-2"> ${element.username} </h4>
          <div>
          <i class="fas fa-user-plus mx-4" onclick="send(${element.id},${i})"></i><a class="btn btn-success text-center" href="friends.html?dataid=${element.id}">view profile</a>
          </div>
        `
        
        list.append(div)

         
       }
        
        }
  

    


      
    
requestheck()
    }
 


    
  });

 
   
}