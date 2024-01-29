<script setup>
import { onBeforeMount, ref, reactive, onMounted, computed } from 'vue';
import PartNames from './components/PartNames.vue';

import UserProfile from './components/UserProfile.vue';

import Post from './components/Post.vue';

import Logo from './components/Logo.vue';
import IconJoin from './components/icons/IconJoin.vue';
import IconFriends from './components/icons/IconFriends.vue';
import IconUser from './components/icons/IconUser.vue';
import IconChannels from './components/icons/IconChannels.vue';
import IconChat from './components/icons/IconChat.vue';
import IconFeed from './components/icons/IconFeed.vue';

import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import Following from './components/Following.vue';
import MyChannels from './components/MyChannels.vue';
import SomethingNew from './components/SomethingNew.vue';


const user = ref(0);
const showLogin = ref(false);
const showRegistration = ref(false);

const data = {
  partNames:["Following", "My channels" ,"Something new"], 
  icons: [IconFeed, IconChannels ,IconFriends],
  active: [ref(true), ref(false), ref(false), ref(false), ref(false)],
  user: reactive({
    id: 0,
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
    data.user.id = 0;
    data.user.authorized = false;
    localStorage.removeItem("token")
}

async function main() {
  let token = "";
  if (localStorage.hasOwnProperty("token")) {
    token = "Bearer " + localStorage.getItem("token");
  }
  try{
    const response = await fetch("http://127.0.0.1:8080", {
      method: 'GET',
      headers: {
        "Authorization":  token,
      }
    })
    
    if (response.status === 200) {
        const json = await response.json();
        data.user.username = json.username;
        data.user.firstName = json.firstName;
        data.user.lastName = json.lastName;
        data.user.id = json.id;
        data.user.authorized = true;
    } 
    else if (response.status === 401) {
      showLogin.value = true;
    } 
  }
  catch(error) {
    //window.alert("Server is not currently not responding or internet connection is unstable");
    console.log(error);
  }
}

function profile() {
  if (!data.user.authorized) {
    showLogin.value = true;
  }
  else {
    logout();
  }
  window.location.reload();
}

function loginError() {
  window.alert("You have to be logged in to use this website")
}
onBeforeMount(() => {
  main();

})
onMounted(() => {
})
</script>

<template>
  <div class="container-fluid full-height" >
    <div class="row">

    <div class="col-sm-12 col-lg-3 d-flex flex-column justify-content-between vh-100 position-sticky">
      <div>
        <Logo></Logo>
        <div class="border border-light border-3 rounded part">
          <PartNames :active="data.active" :parts="data.partNames" :icons="data.icons" ></PartNames>
        </div>
      </div>
      <div class="border border-light border-3 rounded part d-flex justify-content-between">
      <UserProfile>
        <template #pfp> <IconUser></IconUser></template>
        <template #full-name>{{ data.user.fullName }} </template>
        <template #username>@{{ data.user.username }}</template>
        <template #button>
          <button @click="profile" class="my-2 mx-2 btn btn-primary" v-text="change"></button>
        </template>
      </UserProfile>
      <div>
        
      </div>
      </div>
    </div>

    <Following :user="data.user" v-if="data.active[0].value"/>
    <MyChannels :user="data.user" v-if="data.active[1].value"/>
    <SomethingNew :user="data.user" v-if="data.active[2].value"/>

  </div>
  </div>

  <Login v-show="showLogin" @sign-up="() => {showLogin = false; showRegistration = true;}" @close="() => {loginError();}">
  </Login>
  <Registration v-show="showRegistration" @login="() => {showLogin = true; showRegistration = false;}" @close="() => {loginError();}">
    </Registration>
</template>
<style scoped>
.part {
  margin-bottom: 5rem;
}


</style>
