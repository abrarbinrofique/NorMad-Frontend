# NorMad - Frontend

![cover](https://github.com/abrarbinrofique/NorMad-Bakend/blob/main/nor.png)

NorMad is a travel-sharing platform that enables users to book and share travel plans. Below is a description of the key features, technologies used, and how the travel sharing mechanism works.

---

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Travel Booking**: Users can browse available tours and book their desired travel events.
- **Travel Sharing with Friends**: 
  - Users can create travel plans and share them with friends.
  - If a user shares a travel plan with a limited capacity (e.g., 5 spots), only that number of friends can join.
  - Once the group is filled, users are added to the main travel plan only if there are available seats.
  - If the group reaches its limit, no additional users can join until spots open up.
- **Group Chat**: After booking, users can chat with fellow travelers who also booked the same event.
- **Travel Reviews**: Users can leave reviews for their travel experiences and read reviews from others.

## Technologies Used


![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

## Mechanism of Travel Sharing

1. **Creating a Travel Plan**: A user creates a travel plan and specifies the number of spots available for sharing (e.g., 5 spots).
2. **Sharing with Friends**: The user can send invites to friends, who can join the shared travel plan.
3. **Joining the Travel**: Friends can accept the invitation to join. 
   - If the group reaches the maximum number of allowed travelers (5 in this case), they are added to the main travel event.
   - If the main event has no available spots, no one can join until a spot is freed up.
4. **Travel Reviews and Chats**: After booking, users can chat with each other and leave reviews about their travel experiences.

---

## Live Demo

Check out the live demo of the frontend [here](https://abrarbinrofique.github.io/NorMad-Frontend/).
