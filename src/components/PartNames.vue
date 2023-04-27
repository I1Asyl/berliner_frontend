<script setup>
import { reactive, ref } from 'vue';
import Logo from './Logo.vue'
import PartItem from './PartItem.vue';

const props = defineProps(["parts", "icons"]);
defineEmits(["sectionChanged"])
const data = {
    parts:[], 
}

for (let i = 0; i < 5; i++) {
  data.parts.push({name: props.parts[i], icon: props.icons[i], IsActive: ref(false), IsHovered: ref(false)}) 
}

const active = reactive({
  value : 0
});

function activate(id) {
  data.parts[active.value].IsActive.value = false;
  data.parts[id].IsActive.value = true;
  active.value = id;
  console.log(active.value);
}

function hover(id) {
  data.parts[id].IsHovered.value = true;
  console.log(id);
}

function unhover(id) {
  data.parts[id].IsHovered.value = false;
  
}
</script>

<template>


  <PartItem class="btn" :key="part.name" v-for="(part, index) in data.parts" :text-class="{'text-primary':part.IsActive.value, 'text-success':(part.IsHovered.value && !part.IsActive.value), 'text-secondary':(!part.IsHovered.value && !part.IsActive.value)}" @click="$emit('sectionChanged', index);activate(index)" @mouseover="hover(index)" @mouseout="unhover(index)">
    <template #icon><component :is="part.icon"></component></template>
    <template #heading>{{part.name}}</template>
  
  </PartItem>

</template>

<style>
</style>