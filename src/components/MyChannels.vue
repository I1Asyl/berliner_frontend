
<script setup>
import IconChannels from './icons/IconChannels.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';

import {onBeforeMount, computed, ref} from 'vue'
import CreateChannel from './CreateChannel.vue';
const channels = ref(0);
const chosenChannel = ref(0);
const channelForm = ref(false);
const content = ref("");
const contentType = ref("private");
const posts = ref();
const props = defineProps(["user"]);

onBeforeMount(() => {
    getChannels();
    getPosts();
})

async function post() {
  if(chosenChannelName.value === "Channel is not chosen"){ 
    window.alert("Channel is not chosen");
    return;
  }
  fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    id: chosenChannel.value,
}), 
  { 
    method: 'POST', 
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: formToJson()
  }
  );
}

async function getPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/myPost?",{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    posts.value = await response.json();
}

const chosenChannelName = computed(() => {
  if(chosenChannel.value === 0 || channels.value === 0) {
    return "Channel is not chosen";
  }
  for (var channel in channels.value) {
    
    if (channels.value[channel].id === chosenChannel.value) {
      return channels.value[channel].name;
    }
  }
})

const chosenChannelDescription = computed(() => {
  if(chosenChannel === 0 || channels.value === 0) {
    return "";
  }
  for (var channel in channels.value) {
    if (channels.value[channel].id === chosenChannel.value) {
      return channels.value[channel].description;
    }
  }
})




function formToJson() {
    return JSON.stringify({
      content: content.value, 
      isPublic: (contentType.value === "public"),
      authorType: "channel", 
     });
}  

async function getChannels() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/channels",{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    channels.value = await response.json();
}

async function deleteChannel() {
  let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/channels",{ 
        method: 'DELETE', 
        body: JSON.stringify({
            id: chosenChannel.value,
        }),
        headers: {
            "Authorization": token,
        }
    })  
    window.location.reload();
}

async function deletePost(authorType, postId) {
  const response = await fetch("http://127.0.0.1:8080/post", 
  { 
    method: 'DELETE',
    body: JSON.stringify({
      id: postId,
      authorType: authorType,
    }),
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
  }
  );
  window.location.reload();
}

</script>
<template>


     <div class="col-sm-12 col-lg-6">
      <Post class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconChannels></IconChannels></template>
            <template #full-name> {{ chosenChannelName }} </template>
            <template #button>
              <button v-if="!(chosenChannel === 0 || channels.value === 0)" @click="deleteChannel" class="my-2 mx-2 btn btn-danger">Delete channel</button>            
            </template>
          </UserProfile>          
        </template>
        <template #content>Channel description: {{ chosenChannelDescription }}  </template>
        
        </Post>
      <Post  class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconChannels></IconChannels></template>
            <template #full-name> {{ chosenChannelName }} </template>

          </UserProfile>          
        </template>
        <template #content> 
          <form class="form-wrapper">
            <textarea v-model="content" class="form-control"></textarea>
            <div class="d-flex justify-content-between">
              <div class="mt-3 d-flex"> 
                <div class="form-check m-1">
                <input v-model="contentType" class="form-check-input" type="radio" id="private" name="privacy" value="private" checked>
                <label class="form-check-label" for="private">Private</label>
                </div>
                <div class="form-check m-1">
                <input v-model="contentType" class="form-check-input" type="radio" id="public" name="privacy" value="public">
                <label class="form-check-label" for="public">Public</label>
                </div>
              </div>
              <button @click="post" class="btn btn-primary mt-3 mr-3">Post</button>
            </div>
          </form>
        </template>
        </Post>  
        <Post v-for="post in posts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconChannels></IconChannels></template>
            <template #full-name> {{ post.name }} </template>
            <template #button>
              <button v-if="post.leaderId === user.id" @click="() => {deletePost('channel', post.id); }" class="my-2 mx-2 btn btn-danger">Delete a post</button>            
            </template>            
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>      
    </div>   
    
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Choose a channel to post</h3>
        <ul>
            <li v-for="(channel, id) in channels">
              <button @click="chosenChannel = channel.id" class="btn">{{ channel.name }}</button>
            </li>
        </ul>
        <button class="btn btn-primary" @click="channelForm=true;">Create a channel</button>
      </div>
    </div>    
    <CreateChannel :user="props.user" @close="channelForm=false" v-if="channelForm"></CreateChannel>
    </template>