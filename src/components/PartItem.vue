<script setup>
const classes = defineProps(["text-class", "icon-class"])
const clas = "hala";
</script>

<template>
  <div class="item d-flex">
    <i :class="classes.iconClass" class="align-self-center">
      <slot name="icon"></slot>
    </i>
    <div class="details align-self-center">
      <h3 :class="classes.textClass" class="">
        <slot name="heading"></slot>
      </h3>

    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 12px;
  display: flex;
}

.details {
  margin-left: 1rem;
  margin-top: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 30px;
  height: 30px;
  color: var(--color-text);
}

h3 {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-heading);
}

</style>
