<template>
  <div class="fullheight-percent" >
    <section class=" flex flexcol fullheight-percent" >
      <div style="font-weight:300;" class="relative flex flexcol padbottom125 spacebetween flexend" >
        <div class="pointer flex flexend "  >
          <v-btn fab icon @click="$emit('close')" style="margin-bottom:10px;"  >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        </div>

        <div @click="signout" style="bottom:-12px; right:0; " class=" absolute pointer flex flexend flexcenter padright050" >
          <!-- <div class="flat_action relative flex flexcenter">
            <span class="padright025 flat_action" style="margin-top:-2px; font-weight:600;">
              sign out
            </span>
            <svg class="" style="width:20px;height:20px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
            </svg>
          </div> -->
          <v-btn plain >
            signout
          </v-btn>
        </div>

        

      </div>
      <div style="background:white;"  class="flex flexcenter pad125 margintop125 flexcol" >
        <div class="relative fullwidth " >
          <div class="paneBorder absolute" 
          style="background: white; width:90px; height:90px; border-radius: 100%; bottom:0;  right:39%;" >
            <img v-if="user.avatar" :src="usr.avatar" alt="avatar">
          </div>
        </div>
        <div class="flex flexcenter flexcol padtop050" >
          <span style="font-weight:500;" >
            {{user.name}}
          </span>
          <span style="font-weight:300;" class="text-small" >
            {{user.email}}
          </span>
        </div>
      </div>
      <div style="overflow-y: auto; background: white;" class="fullheight-percent relative" >
        <div class="pad050 fullheight-percent absolute fullwidth padbottom125" >
          <slot>
          </slot>
          <div class="pad125" >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['user'],

  methods: {
    signout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$emit('close')
      setTimeout(() => {
        location.reload()
      }, 500)
    },
    setUser() {
      console.log('setting user')
    }
  }
}
</script>

<style>
.notify-tile {
  background: #f3f8fb;
}
.notify-tile:hover {
  background: white !important;
  box-shadow: 1px -1px 16px -1px #DDE1E3;
  /* border: 2px solid #DDE1E3; */
  transition: 150ms;
}
</style>