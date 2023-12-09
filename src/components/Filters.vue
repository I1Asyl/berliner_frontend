<script setup>
const args = defineProps(["options", "id"]);
defineEmits(["change"]);
</script>
<template>
    <div class="mb-3">
    <legend><slot name="header"></slot></legend>
    <div class="form-check" v-for="(option, i) in args.options">
      <input class="form-check-input" type="radio" :id="option" :name="args.id" :value="option" :checked="i == 0" @change="$emit('change', option)">
      <label class="form-check-label" :for="option">{{ option }}</label>
    </div>
    </div>
</template>

<style>
p, label {
    font: 1rem 'Fira Sans', sans-serif;
}

legend {
    font-size: 2rem;
}

</style>