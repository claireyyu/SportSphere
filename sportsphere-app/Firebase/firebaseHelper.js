import { db } from './firebaseSetup';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }

}