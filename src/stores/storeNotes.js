import { defineStore } from "pinia";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/js/firebase";

const notesCollectionRef = collection(db, "notes");

const notesCollectionQuery = query(notesCollectionRef, orderBy("id", "desc"));

export const useStoreNotes = defineStore("storeNotes", {
  /* 
    note: state is only for storing data
  */

  state: () => {
    return {
      notes: [],
    };
  },

  /* 
    note: actions are Methods, functions
  */
  actions: {
    getNotes() {
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
          };
          notes.push(note);
        });
        this.notes = notes;
      });
    },

    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();

      await setDoc(doc(notesCollectionRef, id), {
        content: newNoteContent,
        id,
      });
    },

    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },

    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
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
