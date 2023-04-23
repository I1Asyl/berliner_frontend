<script setup>
import { onBeforeMount, ref, reactive } from 'vue';
import PartNames from './components/PartNames.vue';

import IconJoin from './components/icons/IconJoin.vue';
import IconAddUser from './components/icons/IconAddUser.vue';
import IconEdit from './components/icons/IconEdit.vue';
import IconUser from './components/icons/IconUser.vue';
import IconTeams from './components/icons/IconTeams.vue';

const user = ref(0);
const data = {
  partNames:["My teams", "Join", "Edit","Add user", "Profile"], 
  icons: [IconTeams, IconJoin, IconEdit, IconAddUser, IconUser],
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
  const response = await fetch("http://127.0.0.1:8080/api/myTeams");
   const tmp = await response.json();
   data.user.value = tmp.user;
   console.log(user);
}

onBeforeMount(() => {
  getTeams()
})
</script>

<template>
  <div class="container-fluid full-height">
    <div class="row">
      <PartNames :parts="data.partNames" :icons="data.icons" @section-changed="activate"></PartNames>
    </div>
  </div>

  <div v-show="data.active[0].value">
    My teams
  </div>

</template>
<style scoped>
</style>
