<script setup>
import {ref, reactive} from 'vue'
import Popup from './Popup.vue';


const form = reactive({
    pseudonymName: '', 
    pseudonymDescription: '',
});

const isError = ref(false);

const errors = reactive({
    pseudonymName: '', 
    pseudonymDescription: '',
});

async function createPseudonym() {

    let token = "";
  if (localStorage.hasOwnProperty("token")) {
    token = "Bearer " + localStorage.getItem("token");
  }
    for (let err in errors) {
        errors[err] = "";
    }
    const responce = await fetch("http://127.0.0.1:8080/pseudonyms", {
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
        pseudonymName: form.pseudonymName,
        pseudonymDescription: form.pseudonymDescription
     })
}  

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name>Create a pseudonym</template>
        <template #content>
                <form method="post" class="form-wrapper" action="">
                    <small v-if="isError">Pseudonym name is not correct</small>

                    <div class="form-group">
                        <label for="pseudonym-name">Pseudonym name</label>
                        <input v-model="form.pseudonymName" type="text" class="form-control" placeholder="Pseudonym name">
                    </div>
                    <div class="form-group">
                        <label for="password">Pseudonym description</label>
                        <textarea class="form-control" v-model="form.pseudonymDescription" rows="4"></textarea>
                    </div>
                    <button type="button" @click="createPseudonym()" class="btn btn-primary">Create pseudonym</button>  
            </form>
        </template>
    </Popup>
</template>

<style>

</style>