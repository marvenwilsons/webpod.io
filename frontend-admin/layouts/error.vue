<template>
  <div class="" dark style="background: #e6f2fa; min-width: 500px;" >
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 style="margin:0;" v-else>
      <div style="background: #1976d2; color: #e6f2fa;" class="flex flexcol flexcenter pad125" >
        <svg style="width:44px;height:44px" viewBox="0 0 24 24">
          <path fill="#e6f2fa" d="M6 2C4.89 2 4 2.89 4 4V16C4 17.11 4.89 18 6 18H7V20H4V22H7C8.11 22 9 21.11 9 20V18H11V20C11 21.11 11.89 22 13 22H16V20H13V18H14C15.11 18 16 17.11 16 16V4C16 2.89 15.11 2 14 2H6M10 4.97C11.11 4.97 12 5.87 12 6.97S11.11 8.97 10 8.97C8.9 8.97 8 8.07 8 6.97C8 5.87 8.9 4.97 10 4.97M8 14.5H12V16H8V14.5M18 15H20V17H18V15M18 7H20V13H18V7Z" />
      </svg>
      {{ otherError }}
      </div>
    </h1>
    <div class="pad125" >
      <code style="color: #B71C1C;" class="pad050" >
        <span class="pad050" >
          {{error.message}}
        </span>
      </code>
    </div>
    <!-- <NuxtLink to="/">
      <div>
        Home page
      </div>
    </NuxtLink> -->
    <div class="flex pad125 flexend">
      <v-btn @click="reload" small color="primary" > 
      <strong>reload</strong>
    </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'Oh! oh! The App Crashed'
    }
  },
  methods: {
    reload() {
      location.reload()
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
