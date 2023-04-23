<script setup>
import { reactive, ref } from 'vue';
import Logo from './Logo.vue'
import PartItem from './PartItem.vue';

const props = defineProps(["parts", "icons"]);

const data = {
    parts:[], 
}

for (let i = 0; i < 5; i++) {
  data.parts.push({name: props.parts[i], icon: props.icons[i], IsActive: ref(false)}) 
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
</script>

<template>

<PartItem>
    <template #icon>
      <Logo></Logo>
    </template>
    <template #heading><h2>Berliner</h2></template>
</PartItem>
<div class="h-75 col-sm-12 col-lg-3 border border-light rounded">
  <PartItem class="btn part" :key="part.name" v-for="(part, index) in data.parts" :text-class="{'text-success':part.IsActive.value, 'part': true}" @click="$emit('sectionChanged', index);activate(index)">
    <template #icon><component :is="part.icon"></component></template>
    <template #heading>{{part.name}}</template>
  
  </PartItem>


</div>

</template>

<style>
.part:hover {
  color: aquamarine;
}
</style>