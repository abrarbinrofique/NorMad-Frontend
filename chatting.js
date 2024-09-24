if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
    window.location.href = 'login.html';  // Redirect to login if not authenticated
} else {



chatlist()





}
async function chatlist()
{
   
    let l=localStorage.getItem('user_id')
    console.log(l)
     const  resp= await fetch(`https://normad-bakend.vercel.app/event/list/?people=${l}/`)
     let data= await resp.json()
    
     let chat=document.getElementById('chattinterface')
    
     data.forEach(element => {

        
        
     const div=document.createElement('div')
     div.classList.add('listtext')
     let k=element.id
     div.onclick = function() {
        chats(k);
        programme=k
    };
     div.innerHTML=
     `
     
      <img class="propic" src="https://res.cloudinary.com/dk2vgd0dv/${element.image}">
      ${element.location}
  
     
     `
     chat.append(div)
    });
}


let programme=0;

async function chats(k) {

    let userId = localStorage.getItem('user_id');
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = ''; // Clear previous chats

    const msg = await fetch(`https://normad-bakend.vercel.app/event/travelplan/?plan=${k}/`);
    const res = await msg.json();

    // Append chat messages first
    res.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('message', 'mt-4', 'col-lg-7', 'text-center', 'p-2'); // Adjusting column size and margin
        div.innerHTML = `${element.Text}`;

        if (element.user.includes(parseInt(userId))) {
            div.classList.add('selftext');  // Styling for user's own messages
        } else {
            div.classList.add('othertext'); // Styling for other users' messages
        }
        chatbox.append(div); // Append each chat message to the chatbox
    });

    // Now append the input field AFTER all the messages are added
    const input = document.getElementById('input');
    input.innerHTML = `
    <div data-mdb-input-init class="d-flex form-outline inputfield">
        <input type="text" id="sendsms" class="input custom-input" placeholder="Type Message" required/>
        <i onclick="sender(event,programme)" class="fas fa-paper-plane" style="color: #ffff;"></i>
    </div>
    `;
}


async function sender(event,k)
{   event.preventDefault()
    let texts=document.getElementById('sendsms').value
    userId=localStorage.getItem('user_id')
    console.log(texts)

    
    const formData = {
        user_id: userId,
        text: texts
    };
    console.log(formData,k)
    try {
        const response = await fetch(`https://normad-bakend.vercel.app/event/travelplan/${k}/sendmessage/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        let data = await response.json();
        console.log(data);
        console.log('You send  the message!');
       
       
        
    } catch (error) {
        console.error('Error send msg:', error);
      
    }
}
function logoutuser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
 
    
    
    window.location.href = 'login.html';  
  }
  