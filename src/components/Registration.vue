<script setup>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { computed, reactive } from 'vue';
import Popup from './Popup.vue';
defineEmits(["login", "close"])

const form = reactive({
    username: '', 
    email: '',
    firstName: '', 
    lastName: '', 
    password: '',
})

const rules = reactive({
    username: computed(() => {required}), 
    email: computed(() => {required}),
    firstName: computed(() => {required}),
    lastName: computed(() => {required}),
    password: computed(() => {required}),
})
async function register() {
    const register = await fetch("http://127.0.0.1:8080/signup", {
        method: "POST", 
        body: formToJson()
    });  
      
    const login = await fetch("http://127.0.0.1:8080/login", {
        method: "POST", 
        body: formToJson()
    })
    .then((response) => response.json()).then(
        (json) => {localStorage.setItem("token", json.token)}
    );
    window.location.reload();
}

function formToJson(id) {
    return JSON.stringify({
        username: form.username,
        email: form.email,
        firstName: form.firstName, 
        lastName: form.lastName, 
        password: form.password
     })
}  

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name> Registration</template>
        <template #content>
                <form method="post" class="form-wrapper">
                    <div class="form-group">
                        <label for="username">Your username</label>
                        <input type="text" class="form-control" name="username" v-model="form.username" placeholder="Your username">
                    </div>
                    <div class="form-group">
                        <label for="email">Your email</label>
                        <input type="text" class="form-control" name="email" v-model="form.email" placeholder="Your email">
                    </div>
                    <div class="form-group">
                        <label for="first-name">Your first name</label>
                        <input type="text" class="form-control" name="first-name" v-model="form.firstName" placeholder="Your name">
                    </div>

                    <div class="form-group">
                        <label for="last-name">Your last name</label>
                        <input type="text" class="form-control" name="last-name" v-model="form.lastName" placeholder="Your last name">
                    </div>                    

                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input type="password" class="form-control" name="password" v-model="form.password" placeholder="Your password">
                    </div>
                    <button type="button" @click="register" class="btn btn-primary">Sign up</button>  
                    <button @click="$emit('login')" class="btn" type="button">Log in</button>
            </form>
        </template>
    </Popup>
</template>

