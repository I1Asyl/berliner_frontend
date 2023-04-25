<script setup>
import PartItem from './PartItem.vue';
import IconLogo from './icons/IconLogo.vue';
</script>
<template>
      <PartItem>
        <template #icon>
          <IconLogo></IconLogo>
        </template>
        <template #heading><h2>Berliner</h2></template>
      </PartItem>  
</template>
