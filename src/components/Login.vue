<script setup>
import {ref, reactive} from 'vue'
import Registration from './Registration.vue';
import Popup from './Popup.vue';
const showRegistration = ref(false);
defineEmits(["sign-up", "close"]);

const form = reactive({
    username: '', 
    password: '',
});

const isError = ref(false);

const errors = reactive({
    username: '', 
    password: '',
});

function login() {
    for (let err in errors) {
        errors[err] = "";
    }
    fetch("http://127.0.0.1:8080/login", {
                    method: "POST", 
                    body: formToJson()
                })
                .then(
                    (response) => {
                    if (response.status === 200) 
                        return response.json();
                    else
                        return -1;
                    }
                )
                .then(
                    (json) => {
                        if(json !== -1){
                            localStorage.setItem("token", json.token);
                            window.location.reload();
                        }
                        else {
                            isError.value = true;
                        }
                    }
                );
}

function formToJson() {
    return JSON.stringify({
        username: form.username,
        password: form.password
     })
}  

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name> Login</template>
        <template #content>
                <form method="post" class="form-wrapper" action="">
                    <small v-if="isError">Username or password are not correct</small>

                    <div class="form-group">
                        <label for="username">Your username</label>
                        <input v-model="form.username" type="text" class="form-control" id="username" placeholder="Your username">
                    </div>
                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Your password">
                    </div>
                    <button type="button" @click="login()" class="btn btn-primary">Login</button>  
                    <button @click="$emit('sign-up')" class="btn btn-light" type="button">Sign up</button> 
            </form>
        </template>
    </Popup>
</template>

<style>

</style>