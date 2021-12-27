<template>
  <main   class="flex flexcol relative" style="overflow:hidden;" >
    <textarea v-model="txt" :maxlength="data.maxlength || null" :tabindex="parseInt(key_index)" class="fullwidth pad050 fullheight-percent" cols="20" rows="10"></textarea>
    <div class="absolute fullwidth padright050 padbottom025 flex flexend" style="bottom:0;"  >
      <small v-if="data.maxlength" style="background:white;" >{{txt.length}}/{{data.maxlength}}</small>
    </div>
  </main>
</template>

<script>
export default {
  props: ["data", "_key", "color", "key_index", "disabled", "appearance"],
  data: () => ({
    txt: ''
  }),
  watch: {
    txt(n) {
      if(this.data.hooks) {
        if(this.data.hooks.onInput) {
          this.data.hooks.onInput(n)
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
    this.txt = this.data.value
  }
}
</script>