
<script setup>
import IconTeams from './icons/IconTeams.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';

import {onBeforeMount, computed, ref} from 'vue'
import CreateTeam from './CreateTeam.vue';
const teams = ref(0);
const chosenTeam = ref(0);
const teamForm = ref(false);
const content = ref("");
const posts = ref();
const props = defineProps(["user"]);

onBeforeMount(() => {
    getTeams();
    getPosts();
})

async function post() {
  fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    id: chosenTeam.value,
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
    fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    author: "team",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    }).then((response) => {return response.json()})
    .then(
        (json) => {
            posts.value = json;
            console.log(json);
            return;
        }
    );
}

const chosenTeamName = computed(() => {
  if(chosenTeam.value === 0 || teams.value === 0) {
    return "Team is not chosen";
  }
  for (var team in teams.value) {
    
    if (teams.value[team].id === chosenTeam.value) {
      return teams.value[team].teamName;
    }
  }
})

const chosenTeamDescription = computed(() => {
  if(chosenTeam === 0 || teams.value === 0) {
    return "";
  }
  for (var team in teams.value) {
    if (teams.value[team].id === chosenTeam.value) {
      return teams.value[team].teamDescription;
    }
  }
})




function formToJson() {
    return JSON.stringify({
      content: content.value, 
      authorType: "team", 
     });
}  

async function getTeams() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    fetch("http://127.0.0.1:8080/teams",{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    }).then((response) => {return response.json()})
    .then(
        (json) => {
            teams.value = json;
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
            <template #pfp> <IconTeams></IconTeams></template>
            <template #full-name> {{ chosenTeamName }} </template>
          </UserProfile>          
        </template>
        <template #content>Team description: {{ chosenTeamDescription }}  </template>
        
        </Post>
      <Post  class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconTeams></IconTeams></template>
            <template #full-name> {{ chosenTeamName }} </template>
          </UserProfile>          
        </template>
        <template #content> 
          <form class="form-wrapper">
            <textarea v-model="content" class="form-control"></textarea>
            <div class="d-flex justify-content-end"><button @click="post" class="btn btn-primary mt-3 mr-3">Post</button></div>
          </form>
        </template>
        </Post>  
        <Post v-for="post in posts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconTeams></IconTeams></template>
            <template #full-name> {{ post.teamName }} </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>      
    </div>   
    
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Choose a team to post</h3>
        <ul>
            <li v-for="(team, id) in teams">
              <button @click="chosenTeam = team.id" class="btn">{{ team.teamName }}</button>
            </li>
        </ul>
        <button class="btn btn-primary" @click="teamForm=true;">Create a team</button>
      </div>
    </div>    
    <CreateTeam @close="teamForm=false" v-if="teamForm"></CreateTeam>
    </template>