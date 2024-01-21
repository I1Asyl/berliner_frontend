
<script setup>
import IconUser from './icons/IconUser.vue';
import IconTeams from './icons/IconTeams.vue'
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
import {onActivated, onBeforeMount, reactive, ref} from 'vue'
import CreateTeam from './CreateTeam.vue';
const postType = ref("user");
const userPosts = ref();
const teamPosts = ref();
const followedToUser = ref();

onBeforeMount(() => {
    getUserPosts();
    getTeamPosts();
})

onActivated(() => {

})

function changePostType(option) {
  if (option === "Team posts") {
    postType.value = "team";
  } 
  else {
    postType.value = "user";
  }
}

async function getUserPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/newPost?" + new URLSearchParams({
    author: "user",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    userPosts.value = await response.json();
}

async function getTeamPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/newPost?" + new URLSearchParams({
    author: "team",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    teamPosts.value = await response.json();
}

async function follow(followType, followed) {
  let token = "";
  if (localStorage.hasOwnProperty("token")) {
      token = "Bearer " + localStorage.getItem("token");
  } 
  const response = await fetch("http://127.0.0.1:8080/follow?" + new URLSearchParams({
    follow: followType, 
    followed: followed,
  }), {
    method: 'POST', 
    headers: {
      "Authorization": token,
    }
  })
}

// async function getTeams() {
//     let token = "";
//     if (localStorage.hasOwnProperty("token")) {
//         token = "Bearer " + localStorage.getItem("token");
//     } 
//     console.log(token);   
//     fetch("http://127.0.0.1:8080/newPosts",{ 
//         method: 'GET', 
//         headers: {
//             "Authorization": token,
//         }
//     }).then((response) => {return response.json()})
//     .then(
//         (json) => {
//             data.value = json;
//             return;
//         }
//     );
// }

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

        <Post v-show="postType === `user`" v-for="(post, id) in userPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> {{ post.username }} </template>
            <template #username>{{ post.firstName }} {{ post.lastName }} </template>

            <template #button>
              <button @click="() => {follow('user', post.username);}" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }} </template>
        </Post>      
        <Post v-show="postType === `team`" v-for="post in teamPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconTeams></IconTeams></template>
            <template #full-name> {{ post.teamName }} </template>
            <template #button>
              <button @click="() => {follow('team', post.teamName);}" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>   
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Filters</h3>
          <Filters :options="['User posts', 'Team posts']" id="Type" @change="changePostType">
            <template #header>Type</template>
          </Filters>
      </div>
    </div>    
    </template>