<template>
    <main id="unitile-header">

        <header-title 
        :project_title="project_title"
        :history_info="'a minute ago'"
        @renameTitle="$emit('renameTitle')"
        />

        <header-controlls
        @HeaderCommand="HandleHeaderCommand"
        />

    </main>
</template>

<script>
import headerTitle from './header-title.vue'
import headerControlls from './header-controlls.vue'
export default {
  components: {headerTitle, headerControlls},
  data: () => ({
      project_title: undefined
  }),
  methods: {
      HandleHeaderCommand(command) {
          this.$emit('HeaderCommand', command)
      }
  },
  mounted() {
      this.project_title = this.$parent.myData.title
  }
}
</script>

<style>
#unitile-header {
    background: #232729;
    display: flex;
}
</style>