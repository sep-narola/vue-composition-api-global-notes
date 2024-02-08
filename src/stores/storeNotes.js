// stores/counter.js
import { defineStore } from "pinia";

export const useStoreNotes = defineStore("storeNotes", {
  /* 
    note: state is only for storing data
  */
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate accusantium fugiat esse officiis optio consectetur velit aperiam, illo deserunt ipsa quaerat vel ratione consequuntur atque rem, sequi expedita dignissimos tempore.",
        },
        {
          id: "id2",
          content: "This is a shorter note! Woo!",
        },
      ],
    };
  },

  // Methods, functions
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();
      let note = {
        id, // equivalent to id: id,
        content: newNoteContent,
      };
      this.notes.unshift(note);
    },

    deleteNote(idToDelete) {
      this.notes = this.notes.filter((note) => note.id != idToDelete);
    },
    updateNote(id, content) {
      let index = this.notes.findIndex((note) => note.id == id);
      this.notes[index].content = content;
    },
  },

  // Getters are similar to computed properties, need to return something
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
