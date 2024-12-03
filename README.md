# Sportsphere App

## Overview

Sportsphere is a mobile application designed to help users manage their sports activities, reminders, and chats. The app integrates with Firebase for authentication and database functionalities, allowing users to create, read, update, and delete activities and reminders.

## Third-party API Key
Please add these lines of code to the .env file:

```
EXPO_PUBLIC_weatherApiKey= "J2NKBPU16GeykqzL"
EXPO_PUBLIC_mapApiKey= "AIzaSyA_0463EzbY9HcbMhb0OaZveUkFKvyqArc"
```

## Firebase Database Rule
Please use the following as the firebase database rule:
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Rules for the 'users' collection
    match /users/{user} {
     allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.uid;

     // Rules for the 'reminders' subcollection
      match /reminders/{reminder} {
      allow read: if true;
     allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
      }
    }

    match /activities/{activity} {
      allow read: if true;
     allow create: if request.auth != null;
     allow update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
    }

    // Rules for the 'messages' collection
    match /messages/{messageId} {
      allow read, write: if request.auth != null && (
        request.auth.uid == resource.data.sender || 
        request.auth.uid == resource.data.recipient
      );
    }

    // Rules for all other access
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

```

## Collections
**activities**

**users**

**reminders (a subcollection of users)**

**messages**


## **Data Model**

### **activities**
- **activityName**: string  
- **date**: timestamp  
- **description**: string  
- **owner**: string  
- **peopleGoing**: array\<string>  
- **time**: timestamp  
- **totalMembers**: string  
- **venue**: string  
- **venuePosition**: latitude: number, longitude: number  

---

### **users**
- **bio**: string  
- **email**: string  
- **uid**: string  
- **username**: string  

---

### **reminders** (subcollection of users)
- **date**: timestamp  
- **owner**: string  
- **time**: timestamp  
- **title**: string  
- **turnedOn**: boolean  

---

### **messages**
- **participants**: array\<string>  
- **recipient**: string  
- **sender**: string  
- **text**: string  
- **timestamp**: timestamp  
- **isUnread**: boolean  

## Features

- **Activity Management**: Users can create, view, edit, and delete sports activities. Users can add picture to the activity using camera or existing photos.
- **Reminder Management**: Users can set reminders for their activities and get notification at a particular time.
- **Profile Management**: Users can create, view and edit their profiles. Users can reset password if needed.
- **View Local Weather**: Users can view the current temperature and weather condition at their location.
- **Firebase Integration**: The app uses Firebase for authentication and database management.
- **Instant Messaging**: Users can chat with the organizers of activities.
- **Map Functionality**: Users can view activities nearby on a map.


## Screenshots
![Opening-animation-1](https://github.com/user-attachments/assets/1293ba75-b456-4c0a-bf78-8d15baa6e3fa)
![Opening-animation-2](https://github.com/user-attachments/assets/ac2f9343-2ab4-4abd-9d23-e16f79c58d8b)
![Opening-animation-3](https://github.com/user-attachments/assets/4c11cd0a-ec71-4124-84af-2f161fb7ec92)
![Opening-animation-4](https://github.com/user-attachments/assets/5c410203-00d2-4775-8f9b-a2766fc60f85)
![welcome](https://github.com/user-attachments/assets/f41f2b1f-8409-4bae-a86d-648f8aa8783a)
![signup](https://github.com/user-attachments/assets/3a6fdba1-23f1-42ce-ade9-9a9d1e1bf65f)
![signin](https://github.com/user-attachments/assets/cbd46eba-1da4-4fb5-bdf8-1e4fb67787be)
![Homepage-activity-sort-by-time](https://github.com/user-attachments/assets/519791a2-1321-44ef-b1f4-9a5248cbea27)
![Homepage-aactivity-sort-by-distance](https://github.com/user-attachments/assets/9632e046-a24b-42cb-8834-f38665cc2f48)
![Activity-detail-page](https://github.com/user-attachments/assets/c98bd48d-6d05-439b-b29d-8a89317adc14)
![Join-activity](https://github.com/user-attachments/assets/2b3f4352-be08-469e-b9ce-7d87fb670b6d)
![my-activity's-detail](https://github.com/user-attachments/assets/03471194-9b68-404a-b4ca-35b4a3f5486a)
![edit-activity-page](https://github.com/user-attachments/assets/bf66cc4f-ceda-431f-a4a1-5c62d9453ecd)
![edit-page-with-submit](https://github.com/user-attachments/assets/d37bbc5d-711e-4070-9c37-05c42e4a0323)
![Chat-page](https://github.com/user-attachments/assets/a27eca5d-9f9e-4bdf-8870-be9062d8c47b)
![Chat-detail-page](https://github.com/user-attachments/assets/839d3c9d-36c2-4b9d-aeba-807ce2acc7ba)
![New-activity-page](https://github.com/user-attachments/assets/6c82be8a-14b0-46ea-94e2-3f347ce8d8c1)
![Edit:delete-button-for-my-activity](https://github.com/user-attachments/assets/3e1601e8-d359-4020-80a7-9d6e76059133)
![New-activity-page-with-submit](https://github.com/user-attachments/assets/861e38ff-f03f-4115-9e57-a3a600e5f28d)
![Map-with-user-marker](https://github.com/user-attachments/assets/e2ffb187-efca-4684-a073-6ff744616a1d)
![Map-showing-activities](https://github.com/user-attachments/assets/b6d8f136-f922-4365-a3df-02e21b812794)
![Callout-with-activity-info(redirect-to-detail-page)](https://github.com/user-attachments/assets/6f853030-70cb-43f2-abfd-77f4e748b49c)
![Profile-page](https://github.com/user-attachments/assets/8ec4d613-bb79-4aed-8c67-fe709ad8bb9f)
![Edit-profile-detail](https://github.com/user-attachments/assets/495f798f-cc5c-4d7f-af24-5fd2683bdddb)
![Joined-activity-page](https://github.com/user-attachments/assets/5aa7e3d8-0fe0-4d5a-a32d-320b593d06bb)
![Reminders-page](https://github.com/user-attachments/assets/0ddb4a1b-3ad2-4894-910a-87e784420552)
![Log-out](https://github.com/user-attachments/assets/e1cc0a8e-e40e-4caf-a31a-23c4ae27dbb7)

## Installation

1. **Clone the repository and navigate to the project directory**:

   ```sh
   git clone https://github.com/claireyyu/SportSphere.git
   cd SportSphere/sportsphere-app
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up Firebase**:

   - Create a Firebase project.
   - Copy the `.env.example` file, rename it to `.env`.
   - Add the Firebase configuration to `.env`.
   - Add third party API keys to `.env`. (mentioned above)
   - Modify firebase database's security rule. (mentioned above)

4. **Run the app**:

   ```sh
   npx expo start
   ```

## Contributions

### Yue (Claire) Yu

- Designed and implemented the UI for the main screens, including frontend placeholders to ensure data integration.
- Developed and configured navigation workflows using a combination of Tab Navigator and Stack Navigator for an intuitive user experience.
- Implemented the instant messaging feature, allowing participants to send messages to organizers.
- Implemented the notification feature for user's workout reminder.
- Integrated the third-party weather API for better user experience.
- Implemented the reset password feature to allow changing user's password.

### Xinxin (Amelia) Li

- Built and integrated full CRUD functionality for activities and reminders.
- Implemented secure user authentication using Firebase.
- Implemented Map features to show user's current location and display activities on the map
- Integrated Google places and auto-complete API for user experience
- Implemented Camera features for uploading activity images, take activity pictures, and changing profile photo

## Usage

### Activity Management

- Navigate to the **Activity** tab to view all activities.
- Click on an activity to view details.
- Use the add button to create a new activity.
- Join or leave activities.
- Edit or delete existing activities.
- Sort activity by date or distance.
- Search (filter) activities by activity name, location and date.
- Attach a picture using the camera or an existing photo.

### Instant Messaging

- Choose an activity by clicking on "learn more". In the activity detail page, click on the organizer's avatar and get navigated to her/his profile page. Click on "Message" button to start a conversation.
- Navigate to the **Chat** tab to view all chats.
- Click on a chat to view details and send messages.
- Long press on a chat to delete the chat.

### Map Management
- Click on icons of different activities on the map for information
- Click on the information callout to navigate to activity details page
- Edit/delete/join/leave activities from the details page

### Image Management
- Use camera to take photos or select photos from library to upload in activities
- In edit activity page, long press image to delete an image, click on camera/photo icon to upload more images
- In edit profile page, click on profile to select image from library to change profile

### Profile Management

- Navigate to the **Profile** screen to view and edit your profile.

### Current Weather

- View current temperature and weather condition in the home page.

### Reminder Management

- Navigate to the **Reminder** screen to view all reminders.
- Use the add button to create a new reminder.
- Edit (press) or delete (long press) existing reminders.