import { createStore } from "vuex";
import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// userCollection,
	// addDoc,
	db,
	doc,
	setDoc,
	updateProfile,
	signOut,
} from "../includes/firebase";

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth: (state) => {
			state.userLoggedIn = !state.userLoggedIn;
		},
	},
	getters: {
		authModalShow: (state) => state.authModalShow,
	},
	actions: {
		async register({ commit }, payload) {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				payload.email,
				payload.password
			);

			await setDoc(doc(db, "users", userCred.user.uid), {
				name: payload.name,
				email: payload.email,
				age: payload.age,
				country: payload.country,
			});

			// await addDoc(userCollection, {
			// 	name: payload.name,
			// 	email: payload.email,
			// 	age: payload.age,
			// 	country: payload.country,
			// });

			await updateProfile(userCred.user, {
				displayName: payload.name,
			});

			commit("toggleAuth");
		},
		async login({ commit }, payload) {
			await signInWithEmailAndPassword(auth, payload.email, payload.password);
			commit("toggleAuth");
		},
		async signout({ commit }) {
			await signOut(auth);
			commit("toggleAuth");
		},
		init_login({ commit }) {
			const user = auth.currentUser;

			if (user) {
				commit("toggleAuth");
			}
		},
	},
	modules: {},
});
