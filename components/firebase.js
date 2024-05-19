
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    "apiKey": "AIzaSyC9DE_tHiBfg9-Vz-VoEtCXz46scEY2k_U",
    "authDomain": "creat1vecapital.firebaseapp.com",
    "projectId": "creat1vecapital",
    "storageBucket": "creat1vecapital.appspot.com",
    "messagingSenderId": "871416001357",
    "appId": "1:871416001357:web:fc31b8c9129f88b6f03d04",
    "measurementId": "G-8WEK4D7FPC"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };