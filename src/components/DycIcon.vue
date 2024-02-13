<template>
  <component
    v-if="name"
    :is="type == 'outline' ? outlines[name] : solids[name]"
    :style="{ ...props.style }"
  >
    Loading icon...
  </component>
</template>

<script setup>
/*
  imports
*/
import { defineProps } from "vue";
import * as solids from "@heroicons/vue/24/solid";
import * as outlines from "@heroicons/vue/24/outline";

/*
  props
*/
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, validator: (v) => v == "solid" || v == "outline" },
});
</script>

<style scoped></style>
