/*
  imports
*/
import { toast } from "vue3-toastify";

export function toastr(message = "", { ...args }) {
  setTimeout(() => {
    toast(message, { ...args });
  });
}
