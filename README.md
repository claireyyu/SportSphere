# Sportsphere App

## Overview

Sportsphere is a mobile application designed to help users manage their sports activities, reminders, and chats. The app integrates with Firebase for authentication and database functionalities, allowing users to create, read, update, and delete activities and reminders.

## Collections
**activities**
**users**
**reminders** : subcollection of users

## Features

- **Activity Management**: Users can create, view, edit, and delete sports activities.
- **Reminder Management**: Users can set reminders for their activities.
- **Profile Management**: Users can view and edit their profiles.
- **Firebase Integration**: The app uses Firebase for authentication and database management.
- **Chat Functionality (not implemented yet)**: Users can chat with the organizers of activities.
- **Map Functionality (not implemented yet)**: Users can view activities nearby on a map.


## Screenshots

![Log In](https://github.com/user-attachments/assets/f4030bfb-3247-459d-8077-8dc5cb71cc63)
![Sign Up](https://github.com/user-attachments/assets/0d380243-a19a-4b7f-8994-b12b1357e5cd)
![Main Page](https://github.com/user-attachments/assets/24f794fe-92ed-445c-a521-c118da8e8db7)
![Activity Details of the One User Created](https://github.com/user-attachments/assets/9d450fab-06dd-4011-adf4-fe2ef5720fa1)
![Activity Details of the One Others Created](https://github.com/user-attachments/assets/716a6f41-d012-43aa-b82d-5cb427a36e6d)
![Add New Activity](https://github.com/user-attachments/assets/bbb9b7e0-f142-4d02-8d83-b4d4d6c0ed42)
![Select Date for New Activity](https://github.com/user-attachments/assets/bda989c2-a310-4ddb-b4df-d55a66779fec)
![Sort Activities](https://github.com/user-attachments/assets/2d544a98-4802-43d1-9303-4e6e4b49db4d)
![Chat Screen](https://github.com/user-attachments/assets/1882ca25-8f57-418b-82c3-49d3bb5a54e0)
![Profile Page With Created Activities](https://github.com/user-attachments/assets/a40d9c21-bcd6-435a-a0ac-68c9aa0c7608)
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

## Usage

### Activity Management

- Navigate to the **Activity** tab to view all activities.
- Click on an activity to view details.
- Use the add button to create a new activity.
- Join or leave activities.
- Edit or delete existing activities.

### Chat Functionality (not finished)

- Navigate to the **Chat** tab to view all chats.
- Click on a chat to view details and send messages.

### Profile Management

- Navigate to the **Profile** tab to view and edit your profile.

### Reminder Management

- Navigate to the **Reminder** screen to view all reminders.
- Use the add button to create a new reminder.
- Edit or delete existing reminders.