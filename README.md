# Sportsphere App

## Overview

Sportsphere is a mobile application designed to help users manage their sports activities, reminders, and chats. The app integrates with Firebase for authentication and database functionalities, allowing users to create, read, update, and delete activities and reminders.

# Important Note
The **Reset Password** and **Camera use** feature is not implemented yet.
They will be implemented in Iteration 3.

# Third-party API Key
Please add these lines of code to the .env file:

```
EXPO_PUBLIC_weatherApiKey= "J2NKBPU16GeykqzL"
EXPO_PUBLIC_mapApiKey= "AIzaSyA_0463EzbY9HcbMhb0OaZveUkFKvyqArc"
```

# Firebase Database Rule
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
    	allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
      }
    }

    match /activities/{activity} {
    	allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
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

- **Activity Management**: Users can create, view, edit, and delete sports activities.
- **Reminder Management**: Users can set reminders for their activities and get notification at a particular time.
- **Profile Management**: Users can view and edit their profiles. Users can view current weather on the profile screen.
- **Firebase Integration**: The app uses Firebase for authentication and database management.
- **Instant Messaging**: Users can chat with the organizers of activities.
- **Map Functionality**: Users can view activities nearby on a map.


## Screenshots

![Log In](https://github.com/user-attachments/assets/f4030bfb-3247-459d-8077-8dc5cb71cc63)
![Sign Up](https://github.com/user-attachments/assets/0d380243-a19a-4b7f-8994-b12b1357e5cd)
![Main Page](https://github.com/user-attachments/assets/24f794fe-92ed-445c-a521-c118da8e8db7)
![Activity Details of the One User Created](https://github.com/user-attachments/assets/9d450fab-06dd-4011-adf4-fe2ef5720fa1)
![Activity Details of the One Others Created](https://github.com/user-attachments/assets/716a6f41-d012-43aa-b82d-5cb427a36e6d)
![Add New Activity](https://github.com/user-attachments/assets/bbb9b7e0-f142-4d02-8d83-b4d4d6c0ed42)
![Select Date for New Activity](https://github.com/user-attachments/assets/bda989c2-a310-4ddb-b4df-d55a66779fec)
![Sort Activities](https://github.com/user-attachments/assets/2d544a98-4802-43d1-9303-4e6e4b49db4d)
![Instant Messaging](https://github.com/user-attachments/assets/89e45f72-22ee-4dc2-9fd4-b19a5b41f398)
![Map](https://github.com/user-attachments/assets/8aa3f221-cba4-420c-b345-a41cd2023ce4)
![Profile Page with weather](https://github.com/user-attachments/assets/9c18ffa9-7750-4bd5-86a5-92b6823aa70d)
![Edit Profile](https://github.com/user-attachments/assets/24d3821c-3bb9-44bf-81ab-c6c7378c30fd)
![Workout Notifications Page](https://github.com/user-attachments/assets/d1f681c0-066a-4911-bb12-e75bde19e0fd)
![Add New Notification](https://github.com/user-attachments/assets/e65b2645-1999-473d-b7cb-7a1017bd1972)


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
   - Add your Firebase configuration to `.env`.
   - Add third party API keys to `.env`.
   - Modify firebase database's security rule.

4. **Run the app**:

   ```sh
   npx expo start
   ```

## Contributions

### Yue (Claire) Yu

- Designed and implemented the UI for the main screens, including frontend placeholders to ensure data integration.
- Developed and configured navigation workflows using a combination of Tab Navigator and Stack Navigator for an intuitive user experience.

### Xinxin (Amelia) Li

- Built and integrated full CRUD functionality for activities and reminders.
- Implemented secure user authentication using Firebase.
- Implemented Map features to show interactive map according to user's current location, also show activities on the map and allow user to click on activities to navigate to details page
- Implemented Sort by distance features, which display activities in Home page based on their distances to user's current location

## Usage

### Activity Management

- Navigate to the **Activity** tab to view all activities.
- Click on an activity to view details.
- Use the add button to create a new activity.
- Join or leave activities.
- Edit or delete existing activities.
- Sort activity by date or distance.
- Search (filter) activities by activity name, location and date.

### Instant Messaging

- Choose an activity by clicking on "learn more". In the activity detail page, click on the organizer's avatar and get navigated to her/his profile page. Click on "Message" button to start a conversation.
- Navigate to the **Chat** tab to view all chats.
- Click on a chat to view details and send messages.
- Long press on a chat to delete the chat.

### Chat Functionality

- Navigate to the **Chat** tab to view all chats.
- Click on a chat to view details and send messages.

### Profile Management

- Navigate to the **Profile** tab to view and edit your profile.

### Reminder Management

- Navigate to the **Reminder** screen to view all reminders.
- Use the add button to create a new reminder.
- Edit (press) or delete (long press) existing reminders.

### Map Management

- Click on icons of different activities on the map for information
- Click on the information callout to navigate to activity details page
- Edit/delete/join/leave activities from the details page
