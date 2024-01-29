<script setup>
import {ref, reactive} from 'vue'
import Popup from './Popup.vue';


const form = reactive({
    name: '', 
    description: '',
});

const props = defineProps(['user']);

const isError = ref(false);

const errors = reactive({
    name: '', 
    description: '',
});

async function createChannel() {

    let token = "";
  if (localStorage.hasOwnProperty("token")) {
    token = "Bearer " + localStorage.getItem("token");
  }
    for (let err in errors) {
        errors[err] = "";
    }
    const responce = await fetch("http://127.0.0.1:8080/channels", {
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
        name: (props.user.username + '/' + form.name),
        description: form.description
     })
}  

</script>
<template>
    <Popup @close="$emit('close')">
        <template #name>Create a channel</template>
        <template #content>
                <form method="post" class="form-wrapper" action="">
                    <small v-if="isError">Channel name is not correct</small>

                    <div class="form-group">
                        <label for="channel-name">Channel name</label>
                        <input v-model="form.name" type="text" class="form-control" placeholder="Channel name">
                    </div>
                    <div class="form-group">
                        <label for="password">Channel description</label>
                        <textarea class="form-control" v-model="form.description" rows="4"></textarea>
                    </div>
                    <button type="button" @click="createChannel" class="btn btn-primary">Create a channel</button>  
            </form>
        </template>
    </Popup>
</template>

<style>

</style>