# Sportsphere App

## Overview

Sportsphere is a mobile application designed to help users manage their sports activities, reminders, and chats. The app integrates with Firebase for authentication and database functionalities, allowing users to create, read, update, and delete activities and reminders.

## Features

- **Activity Management**: Users can create, view, edit, and delete sports activities.
- **Reminder Management**: Users can set reminders for their activities.
- **Profile Management**: Users can view and edit their profiles.
- **Firebase Integration**: The app uses Firebase for authentication and database management.
- **Chat Functionality (not implemented yet)**: Users can chat with the organizers of activities.
- **Map Functionality (not implemented yet)**: Users can view activities nearby on a map.


## Screenshots

\


## Installation

1. **Clone the repository and navigate to the project directory**:

   ```sh
   git clone https://github.com/claireyyu/SportSphere.git
   cd sportsphere-app
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