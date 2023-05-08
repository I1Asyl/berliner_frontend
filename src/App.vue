<script setup>
import { onBeforeMount, ref, reactive, onMounted, computed } from 'vue';
import PartNames from './components/PartNames.vue';

import UserProfile from './components/UserProfile.vue';

import Post from './components/Post.vue';

import Logo from './components/Logo.vue';
import IconJoin from './components/icons/IconJoin.vue';
import IconFriends from './components/icons/IconFriends.vue';
import IconUser from './components/icons/IconUser.vue';
import IconTeams from './components/icons/IconTeams.vue';
import IconChat from './components/icons/IconChat.vue';
import IconFeed from './components/icons/IconFeed.vue';

import Filters from './components/Filters.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import Feed from './components/Feed.vue';
import MyTeams from './components/MyTeams.vue';



const user = ref(0);
const showLogin = ref(false);
const showRegistration = ref(false);

const data = {
  partNames:["Feed", "My teams" ,"Friends","Join a team", "Messages"], 
  icons: [IconFeed, IconTeams ,IconFriends, IconJoin, IconChat],
  active: [ref(true), ref(false), ref(false), ref(false), ref(false)],
  user: reactive({
    username: "Not loged in",
    firstName: "",
    lastName: "",
    authorized: false,
    fullName: computed(() => data.user.firstName + " " + data.user.lastName)
  })
}

const active = ref(0);

const change = computed(() => {
  return data.user.authorized ? "Log out" : "Log in";
})
async function logout() {
  
  const response = await fetch("http://127.0.0.1:8080/logout", {
  method: 'GET',
  
});
    data.user.username = "Not loged in";
    data.user.firstName = "";
    data.user.lastName = "";
    data.user.authorized = false;
    localStorage.removeItem("token")
}

async function main() {
  let token = "";
  if (localStorage.hasOwnProperty("token")) {
    token = "Bearer " + localStorage.getItem("token");
  }

  fetch("http://127.0.0.1:8080", {
  method: 'GET',
  headers: {
    "Authorization":  token,
  }
}).then(
  (response) => {
    if (response.status === 200) {
      return response.json();
    }
    else if (response.status === 401) {
      return -1;
    }
  })
.then(
  (json) => {
    if(json !== -1) {
      console.log(json);
      data.user.username = json.username;
      data.user.authorized = true;
    }
  });
}

function profile() {
  if (!data.user.authorized) {
    showLogin.value = true;
  }
  else {
    logout();
  }
}


onBeforeMount(() => {
  main();

})
onMounted(() => {
})
</script>

<template>
  {{ data.active }}
  <div class="container-fluid full-height" >




    <div class="row">

    <div class="col-sm-12 col-lg-3 d-flex flex-column justify-content-around">
      <Logo></Logo>
      <div class="border border-light border-3 rounded part">
        <PartNames :active="data.active" :parts="data.partNames" :icons="data.icons" ></PartNames>
      </div>

      <div class="border border-light border-3 rounded part d-flex justify-content-between">
      <UserProfile>
        <template #pfp> <IconUser></IconUser></template>
        <template #full-name>{{ data.user.fullName }} </template>
        <template #username>@{{ data.user.username }}</template>
      </UserProfile>
      <div>
        <button @click="profile()" class="my-2 mx-2 btn btn-primary" v-text="change"></button>
      </div>
      </div>
    </div>

    <Feed :user="data.user" v-if="data.active[0].value"/>
    <MyTeams :user="data.user" v-if="data.active[1].value"/>


  </div>
  </div>

  <Login v-show="showLogin" @sign-up="() => {showLogin = false; showRegistration = true;}" @close="() => {showLogin = false}">
  </Login>
  <Registration v-show="showRegistration" @login="() => {showLogin = true; showRegistration = false;}" @close="() => {showRegistration = false}">
    </Registration>
</template>
<style scoped>
.part {
  margin-bottom: 5rem;
}


</style>
