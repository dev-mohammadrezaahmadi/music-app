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
	getDoc,
	getDocs,
	doc,
	where,
	query,
	updateDoc,
	deleteDoc,
	limit,
	startAfter,
	orderBy,
} from "firebase/firestore/lite";
import {
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

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
const storage = getStorage();

const usersCollection = collection(db, "users");
const songsCollection = collection(db, "songs");
const commentsCollection = collection(db, "comments");

export {
	auth,
	usersCollection,
	songsCollection,
	commentsCollection,
	db,
	storage,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	addDoc,
	doc,
	setDoc,
	updateProfile,
	signOut,
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
	where,
	query,
	getDoc,
	getDocs,
	updateDoc,
	deleteObject,
	deleteDoc,
	limit,
	startAfter,
	orderBy,
};
