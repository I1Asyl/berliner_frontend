
<script setup>
import IconTeams from './icons/IconTeams.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';

import {onBeforeMount, reactive, ref} from 'vue'
import CreateTeam from './CreateTeam.vue';
const data = ref("")
const teamForm = ref(false);

const props = defineProps(["user"])

onBeforeMount(() => {
    getTeams();
})

async function getTeams() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    console.log(token);   
    fetch("http://127.0.0.1:8080/teams",{ 
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
            <template #pfp> <IconTeams></IconTeams></template>
            <template #full-name> {{ props.user.username }} </template>
            <template #username> Mr Yerassyl</template>
          </UserProfile>          
        </template>
        <template #content> The world has lost a true giant today. Harry Belafonte was a barrier breaker who helped reshape our world through his civil rights advocacy, his music, and his acting. May he rest in peace.</template>
        </Post>
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Teams</h3>
        <ul>
            <li v-for="teams in data">
              <button class="btn">{{ teams.teamName }}</button>
            </li>
        </ul>
        <button class="btn btn-primary" @click="teamForm=true;">Create a team</button>
      </div>
    </div>    
    {{ teamForm.value }}
    <CreateTeam @close="teamForm=false" v-if="teamForm"></CreateTeam>
    </template>