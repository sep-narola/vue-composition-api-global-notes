<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small> {{ characterLength }} </small>
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

import { computed, defineProps, reactive } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import ModalDeleteNote from "@/views/ModalDeleteNote.vue";

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
</script>
