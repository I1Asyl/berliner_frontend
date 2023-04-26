<script setup> 

</script>

<template>
    <div class="post">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body px-3">
            <span class="content"><slot name="content"></slot></span>
        </div>
        <div class="footer">
            <span name="date"></span>
        </div>
    </div>
</template>

<style>
</style>