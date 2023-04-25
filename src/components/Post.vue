<script setup> 

</script>

<template>
    <div class="post">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body">
            <span class="content"><slot name="content"></slot></span>
        </div>
        <div class="footer">
            <span name="date"></span>
        </div>
    </div>
</template>

<style>
.post .body{
    padding-left: 3rem;
}
</style>