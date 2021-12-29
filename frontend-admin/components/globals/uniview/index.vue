<template>
  <div v-if="ready" class="flex flexcol" style="gap:5px;" >
    <div
      v-for="(item,index) in mData"
      :key="index * 321 + uid()"
      :is="item.view"
      :myData="item.viewData"
      :config="item.viewConfig"
      :hooks="typeof item.viewHooks == 'string' ? convertToHook(item.viewHooks): item.viewHooks"
      :ref="`${currentId}${index}`"
      :class="[' borderRad4 ']"
      style="background: white;"
    >
    <!-- {{item}} {{typeof item.viewHooks}} -->
    </div>
  </div>
</template>

<script>
import m from '@/m'
export default {
  mixins: [m],
  props: ['myData','config','hooks','hookArgs'],
  data: () => ({
    s: undefined,
    ready: false,
    currentId: undefined,
    mData: undefined
  }),
  methods: {
    getValueOf(itemIndex) {
      return this.$refs[`${this.currentId}${itemIndex}`][0].value
    },
    convertToHook(str) {
      return new Function(`return ${str}`)()(this.hookArgs.paneCollectionMethods,this.hookArgs.paneObjectMethods,this.hookArgs.paneView,this.hookArgs.paneIndex)
    }
  },
  mounted() {
    // this.mData = new Function(`return ${this.myData}`)()
    this.ready = true
    // console.log(this.myData)

    if(!Array.isArray(this.myData)) {
      this.mData = [{
          view: 'error',
          viewData: {
            msg: `Uniview viewData expected to be an array of objects but got '${typeof this.myData}' instead`
          }
        },]
    } else {
      this.mData = this.myData
    }
  }
}
</script>