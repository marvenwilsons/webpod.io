<template>
  <div class="fullheight-percent" >
    <section class=" flex flexcol fullheight-percent" >
      <div style="font-weight:300;" class="relative flex flexcol padbottom125 spacebetween flexend" >
        <div @click="$emit('close')" style="height:50px;" class="pointer flex flexend flat_action" >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </div>
        <div @click="signout" style="bottom:-12px; right:0; " class="absolute pointer flex flexend flexcenter padright050" >
          <div class="flat_action relative flex flexcenter">
            <span class="padright025 flat_action" style="margin-top:-2px; font-weight:600;">
              sign out
            </span>
            <svg class="" style="width:20px;height:20px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
            </svg>
          </div>
        </div>

      </div>
      <div style="background:white;"  class="flex flexcenter pad125 margintop125 flexcol" >
        <div class="relative fullwidth " >
          <div class="paneBorder absolute" 
          style="background: white; width:90px; height:90px; border-radius: 100%; bottom:0;  right:30%;" >

          </div>
        </div>
        <div class="flex flexcenter flexcol padtop050" >
          <span style="font-weight:500;" >
            Marven Wilson Donque
          </span>
          <span style="font-weight:300;" class="text-small" >
            marvenwilsons@gmail.com
          </span>
        </div>
      </div>
      <div style="overflow-y: auto; background: white;" class="fullheight-percent relative" >
        <div class="pad050 fullheight-percent absolute fullwidth padbottom125" >
          <div v-for="e in 5" :key="e" style="background:#f3f8fb" class="pad050 pointer text-small margintop050 borderRad4 fullwidth">
            <notifcationItem >
            </notifcationItem>
            
          </div>
          <div class="pad125" >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import notifcationItem from './notification-item.vue'
export default {
  components: {
    notifcationItem
  },
  methods: {
    signout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  }
}
</script>