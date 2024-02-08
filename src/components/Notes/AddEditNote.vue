<template>
  <div class="edit-note">
    <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
      <label class="label has-text-white" v-if="label">
        {{ label }}
      </label>
      <div class="field">
        <div class="control">
          <!-- v-model="modelValue" -->
          <textarea
            class="textarea"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            ref="textareaRef"
            v-autofocus
            maxlength="100"
          />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
  imports
*/

import { ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";

/*
  props
*/
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  },
});

/*
  emits
*/
const emit = defineEmits(["update:modelValue"]);

/*
  focus textarea
*/
const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
};

// lets you expose some stuff from your component to its parent
defineExpose({
  focusTextarea,
});
</script>
