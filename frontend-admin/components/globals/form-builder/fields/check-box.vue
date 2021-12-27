<template>
  <div @click="value = !value" @focus="fucosed = true" @blur="fucosed = false" :tabindex="parseInt(key_index)" class="padtop125 padbottom125 padleft050 padright125 flex pointer" >
     <div class="pad025 marginleft050" >
       <!-- <input type="checkbox" name="vehicle1" value="true">  -->
       <svg v-if="!value"  style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
      </svg>
      <svg v-if="value"  style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9" />
      </svg>
     </div>
     <div class="padleft050 fullwidth" >
      <!-- <textarea name="" readonly id="" cols="30" rows="10" class="fullwidth" v-model="desc" /> -->
      <div>
        {{desc}}
      </div>
     </div>
  </div>
</template>

<script>
import m from '../lib/m'
export default {
  props: ["data", "_key", "color", "key_index", "disabled", "appearance"],
  mixins: [m],
  data: () => ({
    desc: undefined,
    fucosed: false,
    value: false
  }),
  watch: {
    fucosed(n) {
      this.$parent.isActive = n
    },
    value(n) {
      if(this.data.hooks) {
        if(this.data.hooks.onInput) {
          this.activateInputHooks(n,'onInput')
        }
      }
      this.$emit("onChange", {
        err: null,
        value: n,
        key: this._key,
      })
    }
  },
  mounted() {
    this.desc = this.data.content
    this.value = this.data.value
  }
}
</script>