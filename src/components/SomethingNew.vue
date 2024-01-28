
<script setup>
import IconUser from './icons/IconUser.vue';
import IconPseudonyms from './icons/IconPseudonyms.vue'
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
import {onActivated, onBeforeMount, reactive, ref} from 'vue'
import CreatePseudonym from './CreatePseudonym.vue';
const postType = ref("user");
const userPosts = ref();
const pseudonymPosts = ref();
const followedToUser = ref();

onBeforeMount(() => {
    getUserPosts();
    getPseudonymPosts();
})

onActivated(() => {

})

function changePostType(option) {
  if (option === "Pseudonym posts") {
    postType.value = "pseudonym";
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

async function getPseudonymPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/newPost?" + new URLSearchParams({
    author: "pseudonym",
    }),{ 
        method: 'GET', 
        headers: {
            "Authorization": token,
        }
    })
    pseudonymPosts.value = await response.json();
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

// async function getPseudonyms() {
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
              <button @click="() => {follow('user', post.username); }" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }} </template>
        </Post>      
        <Post v-show="postType === `pseudonym`" v-for="post in pseudonymPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconPseudonyms></IconPseudonyms></template>
            <template #full-name> {{ post.pseudonymName }} </template>
            <template #button>
              <button @click="() => {follow('pseudonym', post.pseudonymName);}" class="my-2 mx-2 btn btn-primary">Follow</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        
        </Post>   
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Filters</h3>
          <Filters :options="['User posts', 'Pseudonym posts']" id="Type" @change="changePostType">
            <template #header>Type</template>
          </Filters>
      </div>
    </div>    
    </template>