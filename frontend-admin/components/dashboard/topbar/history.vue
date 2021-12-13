<template>
  <main v-if="panes && panes.length > 1" >
    <span @click="$emit('historyClick',index)" class="pointer history-item" v-for="(title,index) in panes" :key="title" >
      {{title}} <span v-if="index != panes.length - 1" >&#8250;</span>
    </span>
  </main>
</template>

<script>
export default {
  data: () => ({
    panes: [],
    paneTitles: []
  }),
  watch: {
    panes(n) {
      
    }
  }
}
</script>

<style>
.history-item:hover {
  text-decoration: underline;
}
</style>