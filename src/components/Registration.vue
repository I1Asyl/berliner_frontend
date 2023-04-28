<script setup>
import Popup from './Popup.vue';
defineEmits(["login", "close"])

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name> Registration</template>
        <template #content>
                <form method="post" class="form-wrapper" action="http://127.0.0.1:8080/signup">
                    <div class="form-group">
                        <label for="username">Your username</label>
                        <input type="text" class="form-control" name="username" value="hoh" placeholder="Your username">
                    </div>
                    <div class="form-group">
                        <label for="first-name">Your first name</label>
                        <input type="text" class="form-control" name="first-name" placeholder="Your name">
                    </div>

                    <div class="form-group">
                        <label for="last-name">Your last name</label>
                        <input type="text" class="form-control" name="last-name" placeholder="Your last name">
                    </div>                    

                    <div class="form-group">
                        <label for="password">Your password</label>
                        <input type="password" class="form-control" name="password" value="test" placeholder="Your password">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign up</button>  
                    <button @click="$emit('login')" class="btn" type="button">Log in</button>
            </form>
        </template>
    </Popup>
</template>

