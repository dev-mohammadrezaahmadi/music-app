import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	setDoc,
	doc,
} from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: `${process.env.VUE_APP_API_KEY}`,
	authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
	projectId: `${process.env.VUE_APP_PROJECT_ID}`,
	storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
	appId: `${process.env.VUE_APP_APP_ID}`,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();

const auth = getAuth();
const db = getFirestore();

const userCollection = collection(db, "users");

export {
	auth,
	userCollection,
	db,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	addDoc,
	doc,
	setDoc,
	updateProfile,
	signOut,
};
