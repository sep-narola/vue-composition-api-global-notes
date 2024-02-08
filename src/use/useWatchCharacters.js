/*
  imports
*/
import { watch } from "vue";

export function useWatchCharacters(valueToWatch, maxChars = 100) {
  watch(valueToWatch, (newValue, oldValue) => {
    console.log("newValue.length =>", newValue.length);
    if (newValue.length >= maxChars) {
      console.log("watch condition > true");
      alert(`Only ${maxChars} characters are allowed!`);
    } else {
      console.log("watch condition > false");
    }
  });
}
