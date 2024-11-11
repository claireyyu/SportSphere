import { db } from './firebaseSetup';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { manageReminder } from '../databaseUtils';


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
      manageReminder(doc, items);
    });
    items.sort((a, b) => a.dtCombined - b.dtCombined);
    callback(items);
  }, (error) => {
    console.error("Failed to fetch data:", error);
    errorCallback(error);
  });

  return unsubscribe;
};