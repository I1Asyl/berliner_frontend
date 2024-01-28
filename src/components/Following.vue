
<script setup>
import {onBeforeMount, ref} from 'vue';
import IconUser from './icons/IconUser.vue';
import IconPseudonyms from './icons/IconPseudonyms.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';

const props = defineProps(['user']);
const postType = ref("user");
const postVis = ref("public");
const content = ref("");
const pseudonymPosts = ref();
const userPosts = ref();
const contentType = ref("private");

function changePostType(option) {
  if (option === "Pseudonym posts") {
    postType.value = "pseudonym";
  } 
  else {
    postType.value = "user";
  }
}

function changePostVis(option) {
  if (option === "Public") {
    postVis.value = "public";
  } 
  else {
    postVis.value = "private";
  }
}

async function getUserPosts() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    const response = await fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
      author: "user",
      }),
      { 
        method: 'GET', 
        headers: {
          "Authorization": token,
        }
    });
    userPosts.value = await response.json();

}

async function getPseudonymPosts() {
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
    });
    pseudonymPosts.value = await response.json();
}

function post() {
  fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    id: props.user.id,
}), 
  { 
    method: 'POST', 
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: formToJson()
  }
  )
}

async function unfollow(followType, followed) {
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
    method: 'DELETE', 
    headers: {
      "Authorization": token,
    }
  });
  window.location.reload();
}

function formToJson() {
    return JSON.stringify({
      content: content.value, 
      isPublic: (contentType.value === "public"),
      authorType: "user", 
     })
}  
onBeforeMount(() => {getUserPosts(); getPseudonymPosts();});
</script>
<template>

     <div class="col-sm-12 col-lg-6">

      <Post class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> {{ props.user.username }} </template>
            <template #username> {{props.user.firstName}} {{props.user.lastName}} </template>
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
              <button @click="() => {post();}" class="btn btn-primary mt-3 mr-3">Post</button>
            </div>
          </form>
        </template>
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
        <Post v-show="postType === `user` && ((`public` === postVis && post.isPublic) || (`private` === postVis && !post.isPublic))" v-for="post in userPosts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> {{ post.username }} </template>
            <template #username>{{ post.firstName }} {{ post.lastName }}</template>
            <template #button>
              <button v-if="post.username !== user.username" @click="() => {unfollow('user', post.username); }" class="my-2 mx-2 btn btn-secondary">Unfollow</button>
              <button v-if="post.username === user.username" @click="() => {unfollow('user', post.username); }" class="my-2 mx-2 btn btn-danger">Delete post</button>
            </template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }} </template>
        </Post>
        <Post v-show="postType === `pseudonym` && ((`public` === postVis && post.isPublic) || (`private` === postVis && !post.isPublic))" v-for="post in pseudonymPosts" class="border border-light border-3 rounded pb-3">
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
        <h3>Filters</h3>
          <Filters :options="['User posts', 'Pseudonym posts']" id="Type" @change="changePostType">
            <template #header>Type</template>
          </Filters>
          <Filters :options="['Public', 'Private']" id="Status" @change="changePostVis">
            <template #header>Public</template>
          </Filters>
      </div>
    </div>    
    </template>