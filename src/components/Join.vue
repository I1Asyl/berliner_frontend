
<script setup>
import IconUser from './icons/IconUser.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
import {onBeforeMount, reactive, ref} from 'vue'
import CreateChannel from './CreateChannel.vue';
const data = ref("")
const channelForm = ref(false);

onBeforeMount(() => {
    getChannels();
})

async function getChannels() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    console.log(token);   
    fetch("http://127.0.0.1:8080/myChannels",{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    }).then((response) => {return response.json()})
    .then(
        (json) => {
            data.value = json;
            return;
        }
    );
}

</script>
<template>
     <div class="col-sm-12 col-lg-6">
      <Post class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> Hello </template>
            <template #username> Mr Yerassyl</template>
          </UserProfile>          
        </template>
        <template #content> The world has lost a true giant today. Harry Belafonte was a barrier breaker who helped reshape our world through his civil rights advocacy, his music, and his acting. May he rest in peace.</template>
        </Post>
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Channels</h3>
        <ul>
            <li v-for="channels in data.channels">{{ channels.ChannelName }}</li>
        </ul>
        <button class="btn btn-primary" @click="channelForm=true;">Create a channel</button>
      </div>
    </div>    
    {{ channelForm.value }}
    <CreateChannel @close="channelForm=false" v-if="channelForm"></CreateChannel>
    </template>