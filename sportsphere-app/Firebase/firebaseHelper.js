import { db } from './firebaseSetup';
import { collection, getDocs, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { manageReminder } from '../databaseUtils';
import { manageActivity } from '../databaseUtils';


export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
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