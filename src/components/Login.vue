<script setup>
import {ref} from 'vue'
import Registration from './Registration.vue';
import Popup from './Popup.vue';
const showRegistration = ref(false);
defineEmits(["sign-up", "close"]);

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name> Login</template>
        <template #content>
                <form method="post" class="form-wrapper" action="">
                    <div class="form-group">
                        <label for="username">Your username</label>
                        <input type="text" class="form-control" id="username" placeholder="Your username">
                    </div>
                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input type="password" class="form-control" id="password" placeholder="Your password">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>  
                    <button @click="$emit('sign-up')" class="btn" type="button">Sign up</button> 
            </form>
        </template>
    </Popup>
</template>

<style>

</style>