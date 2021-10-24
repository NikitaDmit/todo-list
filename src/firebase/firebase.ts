import {initializeApp} from "firebase/app";
import {firebaseConfig} from './config'
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";

export const f = initializeApp(firebaseConfig)
export const dataBase = getFirestore()
export const authWithFirebase = getAuth()
