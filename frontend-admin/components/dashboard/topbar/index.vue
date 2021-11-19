<template>
  <main class="flex spacebetween flexcenter" >
      <div  class="fullwidth" style="color: orange" >
          <div v-if="msg" >{{msg}}</div>
      </div>
      <div class="pointer padright025 flex flexcenter" >
          <span class="marginright050 marginleft050" >
              {{user}}
          </span>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
      </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    msg: undefined,
    user: undefined
  }),
  methods: {
    setMsg(msg) {
      this.msg = msg
    },
    clearMsg() {
      this.msg = undefined
    },
    setUser(user) {
      this.user = user
    }
  }
}
</script>