<template>
	<div
		v-if="login_show_alert"
		class="text-white text-center font-bold p-4 mb-4"
		:class="login_alert_variant"
	>
		{{ login_alert_msg }}
	</div>
	<vee-form @submit="login" :validation-schema="loginSchema">
		<!-- Email -->
		<div class="mb-3">
			<label class="inline-block mb-2">Email</label>
			<vee-field
				name="email"
				type="email"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Email"
			/>
			<error-message class="text-red-500" name="email" />
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Password</label>
			<vee-field
				name="password"
				type="password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Password"
			/>
			<error-message class="text-red-500" name="password" />
		</div>
		<button
			:disabled="login_in_submission"
			type="submit"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
		>
			Submit
		</button>
	</vee-form>
</template>

<script>
export default {
	name: "LoginForm",
	data() {
		return {
			loginSchema: {
				email: "required|email",
				password: "required|min:3|max:32",
			},
			login_in_submission: false,
			login_show_alert: false,
			login_alert_variant: "bg-blue-500",
			login_alert_msg: "Please wait! We are logging you in.",
		};
	},
	methods: {
		login() {
			this.login_show_alert = true;
			this.login_in_submission = true;
			this.login_alert_variant = "bg-blue-500";
			this.login_show_alert = "Please wait! We are logging you in.";

			this.login_alert_variant = "bg-green-500";
			this.login_alert_msg = "Success! You're now logged in.";
		},
	},
};
</script>
