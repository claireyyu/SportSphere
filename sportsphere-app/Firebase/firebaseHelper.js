import { db } from './firebaseSetup';
import { collection, getDoc, getDocs, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, arrayUnion } from 'firebase/firestore';
import { manageReminder } from '../utils/readDBHelper';
import { manageActivity } from '../utils/readDBHelper';

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(data); // Check for any undefined fields
      console.log("Document written with ID: ", docRef.id);
  } catch (error) {
      console.error("Error adding document: ", error);
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
