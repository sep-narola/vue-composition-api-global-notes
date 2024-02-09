<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column"> {{ formattedDate }} </small>
          <small class="column has-text-right"> {{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink class="card-footer-item" :to="`/editNote/${note.id}`">
        Edit
      </RouterLink>
      <a class="card-footer-item" @click.prevent="modals.deleteNote = true">
        Delete
      </a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
/*
  imports
*/

import { computed, reactive } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import ModalDeleteNote from "@/views/ModalDeleteNote.vue";
import { useDateFormat } from "@vueuse/core";

/*
  props
*/

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  character length
*/

const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

/*
  modals
*/

const modals = reactive({
  deleteNote: false,
});

/*
  format date
*/
const formattedDate = computed(() => {
  let date = new Date(parseInt(props.note.date));
  return useDateFormat(date, "DD-MM-YYYY @ HH:mm A").value;
});
</script>
