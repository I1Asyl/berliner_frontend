<script setup>
import IconClose from "./icons/IconClose.vue"
defineEmits(["close"])
</script>
<template>
    <div class="popup container-fluid background">
        <div class="row justify-content-center h-100 w-100 align-items-center">
            <div class="col-sm-8 col-md-6 col-lg-4 border border-light bg-light rounded-top">
                <div class="d-flex justify-content-between py-3">
                <span class="h3"><slot name="name"></slot></span>
                <button class="btn" @click="$emit('close')"><IconClose></IconClose></button>
                </div>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<style>
.popup {
    height: 100vh;
    min-height: 100vh;
    position: fixed;
    z-index: 8;
    left: 0;
    top: 0;
}
</style>