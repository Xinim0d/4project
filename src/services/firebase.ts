import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyB_PFlTxlmL0_XHjz397PXOra4Fx_JN-AE",
    authDomain: "project-24593.firebaseapp.com",
    projectId: "project-24593",
    storage_bucket: "project-24593.firebasestorage.app",
    messagingSenderId: "901866567856",
    appId: "1:901866567856:android:95a29717fa2367e026a375",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const addItemToInventory = async (item: {
    name: string;
    description: string;
    quantity: number;
    code: string;
    dateAdded: Date;
    employeeInfo: string;
}) => {
    try {
        const docRef = await addDoc(collection(db, 'inventory'), item);
        console.log('Item added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        throw new Error('Failed to add item to inventory');
    }
};

// Funkcija prekei ištrinti iš Firestore
export const deleteItemFromInventory = async (barcode: string) => {
    try {
        const inventoryRef = collection(db, 'inventory');
        const q = query(inventoryRef, where('code', '==', barcode));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('No item found with the given barcode');
        }

        querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(doc(db, 'inventory', docSnapshot.id));
        });
    } catch (error) {
        console.error('Error deleting item from inventory:', error);
        throw new Error('Failed to delete item from inventory');
    }
};