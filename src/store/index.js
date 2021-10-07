import { createStore } from "vuex";
import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// usersCollection,
	// addDoc,
	db,
	doc,
	setDoc,
	updateProfile,
	signOut,
} from "../includes/firebase";
import { Howl } from "howler";
import helper from "../includes/helper";

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
		currentSong: {},
		sound: {},
		seek: "00:00",
		duration: "00:00",
		playerProgress: "0%",
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth: (state) => {
			state.userLoggedIn = !state.userLoggedIn;
		},
		newSong: (state, payload) => {
			state.currentSong = payload;
			state.sound = new Howl({
				src: [payload.url],
				html5: true,
			});
		},
		updatePosition: (state) => {
			state.seek = helper.formatTime(state.sound.seek());
			state.duration = helper.formatTime(state.sound.duration());
			state.playerProgress = `${(state.sound.seek() / state.sound.duration()) *
				100}%`;
		},
	},
	getters: {
		authModalShow: (state) => state.authModalShow,
		playing: (state) => {
			if (state.sound.playing) {
				return state.sound.playing();
			}
			return false;
		},
	},
	actions: {
		async newSong({ commit, state, dispatch }, payload) {
			if (state.sound instanceof Howl) {
				state.sound.unload();
			}

			commit("newSong", payload);

			state.sound.play();

			state.sound.on("play", () => {
				requestAnimationFrame(() => {
					dispatch("progress");
				});
			});
		},
		progress({ commit, state, dispatch }) {
			commit("updatePosition");

			if (state.sound.playing()) {
				requestAnimationFrame(() => {
					dispatch("progress");
				});
			}
		},
		async toggleAudio({ state }) {
			if (!state.sound.playing) {
				return;
			}

			if (state.sound.playing()) {
				state.sound.pause();
			} else {
				state.sound.play();
			}
		},
		updateSeek({ state, dispatch }, payload) {
			if (state.sound.playing) {
				return;
			}

			const { x, width } = payload.currentTarget.getBoundingClientRect();
			const clickX = payload.clientX - x;
			const percentage = clickX / width;
			const seconds = state.sound.duration() * percentage;

			state.sound.seek(seconds);

			state.sound.once("seek", () => {
				dispatch("progress");
			});
		},
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

			// await addDoc(usersCollection, {
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
			// async signout({ commit }, { router, route }) {
			await signOut(auth);

			commit("toggleAuth");

			// if (route.meta.requiresAuth) {
			// 	router.push({ name: "Home" });
			// }
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
