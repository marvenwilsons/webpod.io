<template>
  <main>
    <section v-if="notifications.length" >
      <div v-for="notificationInfo in notifications" :key="uid(notificationInfo)"  class="notify-tile pad125 pointer text-small margintop050 borderRad4 fullwidth">
        <notifcationItem :notificationInfo="notificationInfo" >
        </notifcationItem>
      </div>
    </section>
    <section class="flex flexcenter pad125 margin125"  v-if="notifications.length == 0" >
      <h4 style="text-align:center; color: #e6f2fa" >You have no new notifications</h4>
    </section>
  </main>
</template>

<script>
import notifcationItem from './notification-item.vue'
import m from '@/m'
export default {
  components: {notifcationItem},
  props: ['notifications'],
  mixins: [m],
  methods: {
    push() {
      alert('ehy')
    }
  }
}
</script>