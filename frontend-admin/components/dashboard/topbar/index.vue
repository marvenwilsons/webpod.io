<template>
  <main class="flex spacebetween flexcenter padtop025 padbottom025" >
      <div  class="fullwidth" style="color: orange" >
          <div v-if="msg" style="font-weight:600;" >{{msg}}</div>
      </div>
      <div class="pointer padright025 flex flexend fullwidth" >
          <span style="font-weight:600;" class="marginright050 marginleft050 flex flexcenter flexend" >
                {{user.name}}
          </span>
          <!--  -->
          <div @click="$emit('openNotificationWindow')" >
            <div class="flex pad025 relative" style="border-radius: 100%; background: #e5f1fa;" >
              <!--  -->
              <svg  style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#232729" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
              <!--  -->
              <div v-if="notificationLength" class="text-small absolute" 
                style="right:0; top: -2px; border-radius:100%; width: 12px; height:12px; background: linear-gradient(0deg, rgba(35,39,41,1) 0%, rgba(25,118,210,1) 64%);" 
              >
                <!-- <span v-if="notificationLength" >{{notificationLength}}</span> -->
              </div>
            </div>
          </div>
      </div>
  </main>
</template>

<script>
export default {
  props: ['user','notificationLength'],
  data: () => ({
    msg: undefined,
  }),
  methods: {
    setMsg(msg) {
      this.msg = msg
    },
    clearMsg() {
      this.msg = undefined
    },
  }
}
</script>