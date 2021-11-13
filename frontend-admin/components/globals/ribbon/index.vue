<template>
  <div class="fullwidth flex flexend flexwrap" >
    <div
      v-for="(item,index) in myData"
      :key="index * 88 + uid()"
    >
      <el-button size="small" @click="btnClick(item)">
        {{item}}
      </el-button>
    </div>
  </div>
</template>

<script>
import m from '@/m'
export default {
  mixins: [m],
  props: ['myData','config','hooks'],
  methods: {
    btnClick(item) {
      if(this.hooks) {
        if(this.hooks.onButtonClick) {
          this.hooks.onButtonClick(item)
        } else {
          alert('Error: onButtonClick method is missing in viewHooks')
        }
      } else {
        alert('Error: viewHooks object is missing')
      }
    }
  }
}
</script>