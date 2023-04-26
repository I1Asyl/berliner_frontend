<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
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



const user = ref(0);
const data = {
  partNames:["My teams", "Join", "Edit","Add user", "Messages"], 
  icons: [IconTeams, IconJoin, IconEdit, IconAddUser, IconChat],
  active: [ref(false), ref(false), ref(false), ref(false), ref(false)],
  user: ref(0)
}

const active = ref(0);




function activate(id) {
  data.active[active.value].value = false;
  data.active[id].value = true;
  active.value = id;
}
async function getTeams() {
 

  document.cookie = "username=As";

  const response = await fetch("http://127.0.0.1:8080", {  method: 'GET',
  credentials: 'include'});
   const tmp = await response.json();
   data.user.value = tmp.user;
   console.log(tmp);
}

onBeforeMount(() => {
  getTeams()
})
</script>

<template>
  <div class="container-fluid">

  <div class="row">
    <Logo></Logo>

    </div>

    <div class="row">

    <div class="col-sm-12 col-lg-3 d-flex flex-column justify-content-around">

      <div class="border border-light border-3 rounded part"><PartNames :parts="data.partNames" :icons="data.icons" @section-changed="activate"></PartNames></div>

      <div class="border border-light border-3 rounded part">
      <UserProfile>
        <template #pfp> <IconUser></IconUser></template>
        <template #full-name> Hello </template>
        <template #username> Mr Yerassyl</template>
      </UserProfile>
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
  

</template>
<style scoped>
.part {
  margin-bottom: 5rem;
}
</style>
