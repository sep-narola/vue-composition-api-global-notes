<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-2">
    <router-view></router-view>
  </div>
</template>

<script setup>
/*
  imports
*/

import { onMounted } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";
import { useStoreNotes } from "./stores/storeNotes";

/*
  store
*/

const storeNotes = useStoreNotes();

/*
  mounted
*/

onMounted(() => {
  storeNotes.getNotes();
});
</script>
