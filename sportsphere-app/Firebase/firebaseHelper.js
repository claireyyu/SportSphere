import { db } from './firebaseSetup';
import { collection, getDocs } from 'firebase/firestore';

export async function writeToDB(data, collection) {
    try {
        const docRef = await addDoc(collection(db, collection), data);
        console.log("Document written with ID: ", docRef.id);
    } catch {
    console.error("Error adding document: ", error);
    }

}