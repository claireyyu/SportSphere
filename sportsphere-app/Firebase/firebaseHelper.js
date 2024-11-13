import { db } from './firebaseSetup';
import { collection, getDoc, getDocs, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, arrayUnion, arrayRemove } from 'firebase/firestore';
import { manageReminder, manageActivity, manageUser } from '../utils/readDBHelper';


export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(data); // Check for any undefined fields
      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
      console.error("Error adding document: ", error);
  }
}

export async function writeReminderToUserDB(data, collectionName, userID) {
  try {
    const userRef = doc(db, "users", userID);
    const docRef = await addDoc(collection(userRef, collectionName), data);
    console.log("Reminder written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding reminder to user document: ", error);
  }
}


export function readAllFiles(collectionName, callback, errorCallback) {
  const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      if (collectionName === "activities") {
        manageActivity(doc, items);
      } else if (collectionName === "reminders") {
      manageReminder(doc, items);
      } else {
        manageUser(doc, items);
      }
    });
    items.sort((a, b) => a.dtCombined - b.dtCombined);
    callback(items);
  }, (error) => {
    console.error("Failed to fetch data:", error);
    errorCallback(error);
  });

  return unsubscribe;
};

export async function updateDB(id, updatedItem, collectionName) {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, updatedItem);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteDB(id, collectionName) {
    try {
        await deleteDoc(doc(db, collectionName, id));
        console.log("Document with ID: ", id, " deleted");
    } catch (err) {
        console.error(err);
    }
}

export async function readProfile(collectionName, userId, callback) {
  const docRef = doc(db, collectionName, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    callback(docSnap.data());
  } else {
    console.log("No such document!");
  }
}

export async function findUserByUid(uid) {
  try {
    // Create a reference to the users collection
    const usersRef = collection(db, "users");

    // Create a query against the collection where uid matches
    const q = query(usersRef, where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot:", querySnapshot);
    console.log("Query snapshot.doc[0]:", querySnapshot.docs[0]);

    if (!querySnapshot.empty) {
      // Return the first matching document's data (assuming uid is unique)
      return querySnapshot.docs[0].data();
    } else {
      console.log("No matching user found!");
      return null;
    }
  } catch (error) {
    console.error("Error finding user by uid:", error);
    throw error; // Optionally throw error to handle it in the calling function
  }
}

export async function findUserIDByUid(uid) {
  try {
    // Create a reference to the users collection
    const usersRef = collection(db, "users");

    // Create a query against the collection where uid matches
    const q = query(usersRef, where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot:", querySnapshot);
    console.log("Query snapshot.doc[0]:", querySnapshot.docs[0]);

    if (!querySnapshot.empty) {
      // Return the first matching document's data (assuming uid is unique)
      return querySnapshot.docs[0].id;
    } else {
      console.log("No matching user found!");
      return null;
    }
  } catch (error) {
    console.error("Error finding userID by uid:", error);
    throw error; // Optionally throw error to handle it in the calling function
  }
}

export async function updateUserProfile(uid, updatedProfile) {
  try {
    // Create a reference to the users collection
    const usersRef = collection(db, "users");

    // Create a query against the collection where uid matches
    const q = query(usersRef, where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(q);
    console.log("Query snapshot:", querySnapshot);
    console.log("Query snapshot.doc[0] from update:", querySnapshot.docs[0]);

    if (!querySnapshot.empty) {
      // Get the document ID of the first matching document
      const userDocId = querySnapshot.docs[0].id;

      // Create a reference to the user document
      const userRef = doc(db, 'users', userDocId);

      // Update the user document with the new profile information
      await updateDoc(userRef, updatedProfile);
      console.log(`User profile updated for UID: ${uid}`);
    } else {
      console.log("No matching user found!");
    }
  } catch (error) {
    console.error("Error updating user profile: ", error);
  }
}

export async function addUserToActivity(activityId, userId) {
  try {
    const activityRef = doc(db, 'activities', activityId);
    await updateDoc(activityRef, {
      peopleGoing: arrayUnion(userId)
    });
    console.log(`User ${userId} added to activity ${activityId}`);
  } catch (error) {
    console.error("Error adding user to activity: ", error);
  }
}

export async function removeUserFromActivity(activityId, userId) {
  try {
    const activityRef = doc(db, 'activities', activityId);
    await updateDoc(activityRef, {
      peopleGoing: arrayRemove(userId)
    });
    console.log(`User ${userId} removed from activity ${activityId}`);
  } catch (error) {
    console.error("Error removing user from activity: ", error);
  }
}