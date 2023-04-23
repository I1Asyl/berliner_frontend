<script setup>
import WelcomeItem from './WelcomeItem.vue'
// import AddUserIcon from './icons/IconAddUser.vue'
// import IconEdit from './icons/IconEdit.vue';
// import IconJoin from './icons/IconJoin.vue';
// import IconTeams from './icons/IconTeams.vue';
// import IconUser from './icons/IconUser.vue';
</script>

<template>
  <WelcomeItem>
    <template #icon>
    </template>
    <template #heading>Documentation</template>

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconTeams />
    </template>
    <template #heading>Tooling</template>

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <AddUserIcon />
    </template>
    <template #heading>Ecosystem</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconJoin />
    </template>
    <template #heading>Community</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconEdit />
    </template>
    <template #heading>Support Vue</template>

  </WelcomeItem>
</template>
