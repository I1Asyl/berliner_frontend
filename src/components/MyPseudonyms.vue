
<script setup>
import IconPseudonyms from './icons/IconPseudonyms.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';

import {onBeforeMount, computed, ref} from 'vue'
import CreatePseudonym from './CreatePseudonym.vue';
const pseudonyms = ref(0);
const chosenPseudonym = ref(0);
const pseudonymForm = ref(false);
const content = ref("");
const contentType = ref("private");
const posts = ref();
const props = defineProps(["user"]);

onBeforeMount(() => {
    getPseudonyms();
    getPosts();
})

async function post() {
  fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    id: chosenPseudonym.value,
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
    const response = await fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    author: "pseudonym",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    posts.value = await response.json();
}

const chosenPseudonymName = computed(() => {
  if(chosenPseudonym.value === 0 || pseudonyms.value === 0) {
    return "Pseudonym is not chosen";
  }
  for (var pseudonym in pseudonyms.value) {
    
    if (pseudonyms.value[pseudonym].id === chosenPseudonym.value) {
      return pseudonyms.value[pseudonym].pseudonymName;
    }
  }
})

const chosenPseudonymDescription = computed(() => {
  if(chosenPseudonym === 0 || pseudonyms.value === 0) {
    return "";
  }
  for (var pseudonym in pseudonyms.value) {
    if (pseudonyms.value[pseudonym].id === chosenPseudonym.value) {
      return pseudonyms.value[pseudonym].pseudonymDescription;
    }
  }
})




function formToJson() {
    return JSON.stringify({
      content: content.value, 
      isPublic: (contentType.value === "public"),
      authorType: "pseudonym", 
     });
}  

async function getPseudonyms() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/pseudonyms",{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    pseudonyms.value = await response.json();
}

</script>
<template>


     <div class="col-sm-12 col-lg-6">
      <Post class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconPseudonyms></IconPseudonyms></template>
            <template #full-name> {{ chosenPseudonymName }} </template>
          </UserProfile>          
        </template>
        <template #content>Pseudonym description: {{ chosenPseudonymDescription }}  </template>
        
        </Post>
      <Post  class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconPseudonyms></IconPseudonyms></template>
            <template #full-name> {{ chosenPseudonymName }} </template>
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
            <template #pfp> <IconPseudonyms></IconPseudonyms></template>
            <template #full-name> {{ post.pseudonymName }} </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>      
    </div>   
    
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Choose a pseudonym to post</h3>
        <ul>
            <li v-for="(pseudonym, id) in pseudonyms">
              <button @click="chosenPseudonym = pseudonym.id" class="btn">{{ pseudonym.pseudonymName }}</button>
            </li>
        </ul>
        <button class="btn btn-primary" @click="pseudonymForm=true;">Create a pseudonym</button>
      </div>
    </div>    
    <CreatePseudonym @close="pseudonymForm=false" v-if="pseudonymForm"></CreatePseudonym>
    </template>