<script setup>
import {ref, reactive} from 'vue'
import Popup from './Popup.vue';


const form = reactive({
    teamName: '', 
    teamDescription: '',
});

const isError = ref(false);

const errors = reactive({
    teamName: '', 
    teamDescription: '',
});

async function createTeam() {

    let token = "";
  if (localStorage.hasOwnProperty("token")) {
    token = "Bearer " + localStorage.getItem("token");
  }
    for (let err in errors) {
        errors[err] = "";
    }
    const responce = await fetch("http://127.0.0.1:8080/teams", {
        method: "POST", 
        body: formToJson(), 
        headers: {
            "Authorization": token
        }
    })
    if (responce.status === 200) {
        window.location.reload();
    } 
    else {
        isError.value = true;
    }
}

function formToJson(id) {
    return JSON.stringify({
        teamName: form.teamName,
        teamDescription: form.teamDescription
     })
}  

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name> Login</template>
        <template #content>
                <form method="post" class="form-wrapper" action="">
                    <small v-if="isError">Team name is not correct</small>

                    <div class="form-group">
                        <label for="team-name">Team name</label>
                        <input v-model="form.teamName" type="text" class="form-control" placeholder="Team name">
                    </div>
                    <div class="form-group">
                        <label for="password">Team description</label>
                        <textarea class="form-control" v-model="form.teamDescription" rows="4"></textarea>
                    </div>
                    <button type="button" @click="createTeam()" class="btn btn-primary">Create team</button>  
            </form>
        </template>
    </Popup>
</template>

<style>

</style>