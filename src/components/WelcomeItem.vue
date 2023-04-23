<script setup>
const classes = defineProps(["text-class", "icon-class"])
const clas = "hala";
</script>

<template>
  <div class="item d-flex">
    <i :class="classes.iconClass">
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3 :class="classes.textClass">
        <slot name="heading"></slot>
      </h3>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
}

.details {
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
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
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

</style>
