<script setup>
import { onBeforeMount, ref, reactive, onMounted, computed } from 'vue';
import PartNames from './components/PartNames.vue';

import UserProfile from './components/UserProfile.vue';

import Post from './components/Post.vue';

import Logo from './components/Logo.vue';
import IconJoin from './components/icons/IconJoin.vue';
import IconAddUser from './components/icons/IconAddUser.vue';
import IconEdit from './components/icons/IconEdit.vue';
import IconUser from './components/icons/IconUser.vue';
import IconTeams from './components/icons/IconTeams.vue';
import IconChat from './components/icons/IconChat.vue';
import Filters from './components/Filters.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';



const user = ref(0);
const showLogin = ref(false);
const showRegistration = ref(false);
const data = {
  partNames:["My teams", "Join", "Edit","Add user", "Messages"], 
  icons: [IconTeams, IconJoin, IconEdit, IconAddUser, IconChat],
  active: [ref(false), ref(false), ref(false), ref(false), ref(false)],
  user: reactive({
    username: "Not loged in",
    firstName: "",
    lastName: "",
    authorized: false,
    fullName: computed(() => data.user.firstName + " " + data.user.lastName)
  })
}

const active = ref(0);



function activate(id) {
  data.active[active.value].value = false;
  data.active[id].value = true;
  active.value = id;
}

async function logout() {
  
  const response = await fetch("http://127.0.0.1:8080/logout", {
  method: 'GET',
  credentials: 'include'
});
    data.user.username = "Not loged in";
    data.user.firstName = "";
    data.user.lastName = "";
    data.user.authorized = false;
}

async function main() {
  const response = await fetch("http://127.0.0.1:8080", {
  method: 'GET',
  headers: {
    "Authorization": localStorage.getItem("token"),
  }
}).then((response) => response.json())
.then((json) => {data.user.username = json.username});
}


function profile() {
  if (!data.user.authorized) {
    showLogin.value = true;
  }
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
    <Logo></Logo>

    </div>

    <div class="row">

    <div class="col-sm-12 col-lg-3 d-flex flex-column justify-content-around">

      <div class="border border-light border-3 rounded part"><PartNames :parts="data.partNames" :icons="data.icons" @section-changed="activate"></PartNames></div>

      <div class="border border-light border-3 rounded part">
      <UserProfile class="btn">
        <template #pfp> <IconUser></IconUser></template>
        <template #full-name>{{ data.user.fullName }} </template>
        <template #username>@{{ data.user.username }}</template>
      </UserProfile>
      <button @click="profile()" class="btn btn-primamry"> Alo</button>

      </div>

    </div>
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
