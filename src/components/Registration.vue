<script setup>
import Popup from './Popup.vue';
defineEmits(["login", "close"])

async function register() {
    const register = await fetch("http://127.0.0.1:8080/signup", {
        method: "POST", 
        body: registerFormToJson()
    });  
      
    const login = await fetch("http://127.0.0.1:8080/login", {
        method: "POST", 
        body: registerFormToJson()
    })
    .then((response) => response.json()).then(
        (json) => {localStorage.setItem("token", json.token)}
    );
}

function registerFormToJson(id) {
    let username = document.getElementById("register-username").value;
    let firstName = document.getElementById("register-first-name").value;
    let lastName = document.getElementById("register-last-name").value;
    let password = document.getElementById("register-password").value;
    return JSON.stringify({
        username: username,
        firstName: firstName, 
        lastName: lastName, 
        password: password
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
                        <input type="text" class="form-control" name="username" id="register-username" placeholder="Your username">
                    </div>
                    <div class="form-group">
                        <label for="first-name">Your first name</label>
                        <input type="text" class="form-control" name="first-name" id="register-first-name" placeholder="Your name">
                    </div>

                    <div class="form-group">
                        <label for="last-name">Your last name</label>
                        <input type="text" class="form-control" name="last-name" id="register-last-name" placeholder="Your last name">
                    </div>                    

                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input type="password" class="form-control" name="password" id="register-password" placeholder="Your password">
                    </div>
                    <button type="button" @click="register" class="btn btn-primary">Sign up</button>  
                    <button @click="$emit('login')" class="btn" type="button">Log in</button>
            </form>
        </template>
    </Popup>
</template>

