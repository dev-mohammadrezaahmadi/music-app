import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// import About from '@/views/About.vue';
import Manage from "@/views/Manage.vue";
import store from "@/store";
import Song from "@/components/Song.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/manage-music",
		// alias: "/manage",
		name: "Manage",
		meta: {
			requiresAuth: true,
		},
		component: Manage,
		// beforeEnter: (to, from, next) => {
		// 	console.log("Manage Route Guard");
		// 	next();
		// },
	},
	{
		path: "/song/:id",
		name: "Song",
		component: Song,
	},
	{
		path: "/manage",
		redirect: { name: "Manage" },
	},
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "Home" },
	},
	// {
	// 	path: "/about",
	// 	name: "About",
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ "../views/About.vue"),
	// },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: "text-yellow-500",
});

// Global Guarding Route
// router.beforeEach((to, from, next) => {
// 	console.log("Global Guard");
// 	console.log(to, from);

// 	next();
// });

router.beforeEach((to, from, next) => {
	if (!to.matched.some((record) => record.meta.requiresAuth)) {
		next();
		return;
	}

	if (store.state.userLoggedIn) {
		next();
	} else {
		next({ name: "Home" });
	}
});

export default router;
