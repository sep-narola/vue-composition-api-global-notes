<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            v-model="newNote"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            @click="addNote"
            :disabled="!newNote || !newNote?.trim()"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteClicked="deleteNote"
    />
  </div>
</template>

<script setup>
/*
  imports
*/

import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";

/*
  notes
*/

const newNote = ref("");
const newNoteRef = ref(null);

const notes = ref([
  {
    id: "id1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate accusantium fugiat esse officiis optio consectetur velit aperiam, illo deserunt ipsa quaerat vel ratione consequuntur atque rem, sequi expedita dignissimos tempore.",
  },
  {
    id: "id2",
    content: "This is a shorter note! Woo!",
  },
]);

/*
  add note
*/
const addNote = () => {
  let currentDate = new Date().getTime(),
    id = currentDate.toString();
  let note = {
    id, // similar to id: id,
    content: newNote.value,
  };
  notes.value.unshift(note);
  newNote.value = "";
  newNoteRef.value.focus();
};

/*
  delete note
*/

const deleteNote = (idToDelete) => {
  notes.value = notes.value.filter((note) => note.id != idToDelete);
};
</script>
