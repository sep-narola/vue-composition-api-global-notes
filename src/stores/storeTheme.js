import { defineStore } from "pinia";

export const useStoreTheme = defineStore("storeTheme", {
  state: () => {
    return { isDarkMode: false };
  },
  actions: {
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      const bodyEl = document.getElementsByTagName("body")[0];

      if (this.isDarkMode) {
        bodyEl.classList.add("has-background-dark");
      } else {
        bodyEl.classList.remove("has-background-dark");
      }
    },
  },

  getters: {
    isDarkModeEnabled: (state) => state.isDarkMode,
  },
});
