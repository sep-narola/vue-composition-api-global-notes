<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>No. of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>No. of Characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      type="text"
      class="input"
      v-model="appFeedback"
      placeholder="Provide your feedback here..."
      v-autofocus
    />
  </div>
</template>

<script setup>
/*
  imports
*/

import { ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { vAutofocus } from "@/directives/vAutofocus";
import { useWatchCharacters } from "@/use/useWatchCharacters";

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  feedback
*/

const appFeedback = ref("");

/*
  watch characters
*/
useWatchCharacters(appFeedback, 50);
</script>
