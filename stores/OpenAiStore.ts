import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useApiKeyStore = defineStore("apiKey", {
  state: () => ({
    apiKey: "",
  }),
  actions: {
    setApiKey(key: string, remember: boolean = false) {
      this.apiKey = key;
      const cookie = useCookie("openai-api-key", {
        maxAge: remember ? 30 * 24 * 60 * 60 : undefined, // 30 days if remember is true, session cookie otherwise
      });
      cookie.value = key;
    },
    loadApiKey() {
      const cookie = useCookie("openai-api-key");
      if (cookie.value) {
        this.apiKey = cookie.value;
      }
    },
    clearApiKey() {
      this.apiKey = "";
      const cookie = useCookie("openai-api-key");
      cookie.value = "";
    },
  },
});
