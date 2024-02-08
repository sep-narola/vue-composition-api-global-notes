<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
    >
      <template #buttons>
        <button class="button is-link is-light mr-4" @click="$router.back()">
          Cancel
        </button>
        <button
          class="button is-link has-background-link"
          @click="handleSaveClicked"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
/*
  imports
*/
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

/*
  router
*/

const route = useRoute();
const router = useRouter();

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  note
*/

const noteContent = ref("");

noteContent.value = storeNotes.getNoteContent(route.params.id);

/*
  handle save clicked
*/

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push("/");
};
</script>
