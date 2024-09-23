import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useApiKeyStore = defineStore("apiKey", {
	state: () => ({
		apiKey: "",
		remember: false,
	}),
	actions: {
		setRemember(remember: boolean) {
			this.remember = remember;
			const cookie = useCookie("openai-remember", {
				maxAge: remember ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember is true, session cookie otherwise
			});
			cookie.value = remember ? "true" : "false";

			if (!remember) {
				const cookie = useCookie("openai-api-key");
				cookie.value = "";
			} else {
				const cookie = useCookie("openai-api-key", {
					maxAge: remember ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember is true, session cookie otherwise
				});
				cookie.value = this.apiKey;
			}
		},
		setApiKey(key: string) {
			this.apiKey = key;
			if (!this.remember) return;
			const cookie = useCookie("openai-api-key", {
				maxAge: this.remember ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember is true, session cookie otherwise
			});
			cookie.value = key;
		},
		loadApiKey() {
			const rememberCookie = useCookie("openai-remember");
			if (rememberCookie.value) {
				this.remember = rememberCookie.value.toString() == "true";
			}
			const cookie = useCookie("openai-api-key");
			if (cookie.value) {
				this.apiKey = cookie.value;
			}
		},
		clearApiKey() {
			this.apiKey = "";
			this.remember = false;
			const cookie = useCookie("openai-api-key");
			cookie.value = "";
			const rememberCookie = useCookie("openai-remember");
			rememberCookie.value = "";
		},
	},
});
