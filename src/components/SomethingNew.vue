
<script setup>
import IconUser from './icons/IconUser.vue';
import IconChannels from './icons/IconChannels.vue'
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
import {onActivated, onBeforeMount, reactive, ref} from 'vue'
import CreateChannel from './CreateChannel.vue';
const postType = ref("user");
const userPosts = ref();
const channelPosts = ref();
const followedToUser = ref();

onBeforeMount(() => {
    getUserPosts();
    getChannelPosts();
})

onActivated(() => {

})

function changePostType(option) {
  if (option === "Channel posts") {
    postType.value = "channel";
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

async function getChannelPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/newPost?" + new URLSearchParams({
    author: "channel",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    channelPosts.value = await response.json();
}

async function follow(followType, followed) {
  let token = "";
  if (localStorage.hasOwnProperty("token")) {
      token = "Bearer " + localStorage.getItem("token");
  } 
  const response = await fetch("http://127.0.0.1:8080/follow?" + new URLSearchParams({
    follow: followType, 
  }), {
    body: JSON.stringify({
      username: followed,
    }),
    method: 'POST', 
    headers: {
      "Authorization": token,
    }
  });
  window.location.reload();
}

// async function getChannels() {
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

        <Post v-show="postType === `user`" v-for="(post, id) in userPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> {{ post.username }} </template>
            <template #username>{{ post.firstName }} {{ post.lastName }} </template>

            <template #button>
              <button @click="() => {follow('user', post.username); }" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }} </template>
        </Post>      
        <Post v-show="postType === `channel`" v-for="post in channelPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconChannels></IconChannels></template>
            <template #full-name> {{ post.name }} </template>
            <template #button>
              <button @click="() => {follow('channel', post.name);}" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>   
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Filters</h3>
          <Filters :options="['User posts', 'Channel posts']" id="Type" @change="changePostType">
            <template #header>Type</template>
          </Filters>
      </div>
    </div>    
    </template>