
<script setup>
import IconUser from './icons/IconUser.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
import {onBeforeMount, reactive, ref} from 'vue'
import CreateTeam from './CreateTeam.vue';
const data = ref("")
const teamForm = ref(false);

onBeforeMount(() => {
    getTeams();
})

async function getTeams() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    console.log(token);   
    fetch("http://127.0.0.1:8080/newPosts",{ 
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
    </template>