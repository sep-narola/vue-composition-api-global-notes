import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";
import { useStoreNotes } from "@/stores/storeNotes";
import { toastr } from "@/use/useToastr";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
      authLoaded: false,
    };
  },

  actions: {
    // This hook will be fired everytime the user logs on or logs out
    init() {
      this.authLoaded = false;

      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          this.user.id = user.uid;
          this.user.email = user.email;
          this.authLoaded = true;
          this.router.push("/");
          storeNotes.init();
        } else {
          // User is signed out
          this.user = {};
          this.authLoaded = true;
          this.router.replace("/auth");
          storeNotes.clearNotes();
        }
      });
    },

    registerUser(credentails) {
      this.authLoaded = false;
      createUserWithEmailAndPassword(
        auth,
        credentails.email,
        credentails.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toastr("User registered successfully!", { type: "success" });
          this.authLoaded = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toastr(
            errorMessage
              ? `${errorCode} - ${errorMessage}`
              : "Something went wrong while registering user!",
            { type: "error" }
          );
          this.authLoaded = true;
        });
    },

    loginUser(credentials) {
      this.authLoaded = false;
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.authLoaded = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toastr(
            errorMessage
              ? `${errorCode} - ${errorMessage}`
              : "Something went wrong, please try again later!",
            { type: "error" }
          );
          this.authLoaded = true;
        });
    },

    logoutUser() {
      this.authLoaded = false;
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.authLoaded = true;
        })
        .catch((error) => {
          // An error happened.
          const errorCode = error.code;
          const errorMessage = error.message;
          toastr(
            errorMessage
              ? `${errorCode} - ${errorMessage}`
              : "Something went wrong while logging out the user!",
            { type: "error" }
          );
          this.authLoaded = true;
        });
    },
  },
});
