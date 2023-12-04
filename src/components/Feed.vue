
<script setup>
import {onBeforeMount, ref} from 'vue';
import IconUser from './icons/IconUser.vue';
import UserProfile from './UserProfile.vue';
import Post from './Post.vue';
import Filters from './Filters.vue';
const props = defineProps(['user'])

const content = ref("")
const posts = ref("")

async function getTeams() {
    let token = "";
    if (localStorage.hasOwnProperty("token")) {
        token = "Bearer " + localStorage.getItem("token");
    } 
    fetch("http://127.0.0.1:8080/post?" + new URLSearchParams({
    author: "user",
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

async function post() {
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

function formToJson() {
    return JSON.stringify({
      content: content.value, 
      authorType: "user", 
     })
}  
onBeforeMount(() => getTeams());
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
            <div class="d-flex justify-content-end"><button @click="() => {post();}" class="btn btn-primary mt-3 mr-3">Post</button></div>
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
        <Post v-for="post in posts" class="border border-light border-3 rounded pb-3">
        <template #header> 
          <UserProfile>
            <template #pfp> <IconUser></IconUser></template>
            <template #full-name> {{ post.username }} </template>
            <template #username>{{ post.firstName }} {{ post.lastName }}</template>
          </UserProfile>          
        </template>
        <template #content>{{ post.content }}</template>
        </Post>
    </div>   
    <div class="col-sm-12 col-lg-3">
      <div class="border border-light border-3 rounded px-3 py-3">
        <h3>Filters</h3>
          <Filters :options="['Important', 'Usual']" id="Importance">
            <template #header>Importance</template>
          </Filters>
          <Filters :options="['Public', 'Private']" id="Status">
            <template #header>Public</template>
          </Filters>
      </div>
    </div>    
    </template>