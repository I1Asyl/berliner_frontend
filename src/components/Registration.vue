<script setup>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { computed, reactive } from 'vue';
import Popup from './Popup.vue';
import { UNREF } from '@vue/compiler-core';
defineEmits(["login", "close"])

const form = reactive({
    username: '', 
    email: '',
    firstName: '', 
    lastName: '', 
    password: '',
});

const errors = reactive({
    username: '', 
    email: '',
    firstName: '', 
    lastName: '', 
    password: '',
});

async function register() {
    for (let err in errors) {
        errors[err] = "";
    }
    const responce = await fetch("http://127.0.0.1:8080/signup", {
        method: "POST", 
        body: formToJson()
    })
    if(responce.status === 422) {
        const json = await responce.json();
        for (let invalid in json) {
            errors[invalid] = json[invalid];
        }        
    } 
    else if (responce.status === 500) {
        window.alert("Server is not currently not responding, try again later please")
    }
    else if (responce.status === 200){
        const resp = await fetch("http://127.0.0.1:8080/login", {
            method: "POST", 
            body: formToJson()
        })
        if (resp.status === 200) {
            const js = await resp.json();
            if(js !== -1){
                localStorage.setItem("token", js.token);
                window.location.reload();

            }
        }
    }


 



}

function formToJson() {
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
        <template #name> Registration </template>
        <template #content>
                <form method="post" class="form-wrapper">
                    <div class="form-group">
                        <label for="username">Your username</label>
                        <input type="text" class="form-control" name="username" v-model="form.username" placeholder="Your username">
                        <small>{{ errors.username }}</small>
                    </div>
                    <div class="form-group">
                        <label for="email">Your email</label>
                        <input type="text" class="form-control" name="email" v-model="form.email" placeholder="Your email">
                        <small>{{ errors.email }}</small>
                    </div>
                    <div class="form-group">
                        <label for="first-name">Your first name</label>
                        <input type="text" class="form-control" name="first-name" v-model="form.firstName" placeholder="Your name">
                        <small>{{ errors.firstName }}</small>
                    </div>

                    <div class="form-group">
                        <label for="last-name">Your last name</label>
                        <input type="text" class="form-control" name="last-name" v-model="form.lastName" placeholder="Your last name">
                        <small>{{ errors.lastName }}</small>
                    </div>                    

                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input type="password" class="form-control" name="password" v-model="form.password" placeholder="Your password">
                        <small>{{ errors.password }}</small>
                    </div>
                    <button type="button" @click="register" class="btn btn-primary">Sign up</button>  
                    <button @click="$emit('login')" class="btn btn-light" type="button">Log in</button>
            </form>
        </template>
    </Popup>
</template>

