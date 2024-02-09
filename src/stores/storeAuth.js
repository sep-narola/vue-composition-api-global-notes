import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";

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
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          this.user.id = user.uid;
          this.user.email = user.email;
          this.authLoaded = true;
          this.router.push("/");
        } else {
          // User is signed out
          this.user = {};
          this.authLoaded = true;
          this.router.replace("/auth");
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
          console.log("register > user =>", user);
          this.authLoaded = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("register error =>", errorMessage);
          this.authLoaded = true;
        });
    },

    loginUser(credentials) {
      this.authLoaded = false;
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("login > user =>", user);
          this.authLoaded = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("login error =>", errorMessage);
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
          console.log("logout error =>", error);
          this.authLoaded = true;
        });
    },
  },
});
