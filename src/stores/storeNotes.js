import { defineStore } from "pinia";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";
import { toastr } from "@/use/useToastr";
import { toast } from "vue3-toastify";

let notesCollectionRef;
let notesCollectionQuery;

let getNotesSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  /* 
    note: state is only for storing data
  */

  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },

  /* 
    note: actions are Methods, functions
  */
  actions: {
    // initialize database refs
    init() {
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },

    getNotes() {
      this.notesLoaded = false;

      if (getNotesSnapshot) getNotesSnapshot(); // unsubscribe from the active listener

      getNotesSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });
          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          this.notesLoaded = true;
          const errorCode = error.code;
          const errorMessage = error.message;
          toastr(
            errorMessage
              ? `${errorCode} - ${errorMessage}`
              : "Something went wrong while fetching the notes!",
            { type: "error", autoClose: 2000 }
          );
        }
      );
    },

    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastr(
          errorMessage
            ? `${errorCode} - ${errorMessage}`
            : "Something went wrong while adding the note!",
          { type: "error", autoClose: 2000 }
        );
      });
    },

    async deleteNote(idToDelete) {
      deleteDoc(doc(notesCollectionRef, idToDelete))
        .then(() => {
          toastr("Successfully deleted the note!", {
            type: "warning",
            transition: "slide",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toastr(
            errorMessage
              ? `${errorCode} - ${errorMessage}`
              : "Something went wrong while deleting the note!",
            { type: "error", autoClose: 2000 }
          );
        });
    },

    async updateNote(id, content) {
      updateDoc(doc(notesCollectionRef, id), {
        content,
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastr(
          errorMessage
            ? `${errorCode} - ${errorMessage}`
            : "Something went wrong while updating the note!",
          { type: "error", autoClose: 2000 }
        );
      });
    },

    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot();
    },
  },

  /* 
    note: getters are similar to computed properties, need to return something
  */
  getters: {
    getNoteContent: (state) => {
      return (id) => state.notes.filter((note) => note.id == id)[0].content;
    },

    totalNotesCount: (state) => state.notes.length,

    totalCharactersCount: (state) =>
      state.notes.reduce(
        (characterCounts, currentNote) =>
          (characterCounts += currentNote.content.length),
        0
      ),
  },
});
