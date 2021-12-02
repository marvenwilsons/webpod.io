<template>
  <div v-if="ready" class="flex flexcol" style="gap:1px;" >
    <div
      v-for="(item,index) in mData(s)"
      :key="index * 321 + uid()"
      :is="item.view"
      :myData="item.viewData"
      :config="item.viewConfig"
      :hooks="typeof item.viewHooks == 'string' ? convertToHook(item.viewHooks): item.viewHooks"
      :ref="`${currentId}${index}`"
      :class="['paneItemBg borderRad4 paneBorder']"
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
    this.mData = new Function(`return ${this.myData}`)()

    if(typeof this.mData != 'function') {
      alert(`Error: uniview's viewData property should be a function that returns an array of view objects not ${typeof this.mData}`)
    } 
    else if(Array.isArray(this.mData()) == false) {
      alert(`Error: uniview's viewData property should be a function that returns an array of view objects not ${typeof this.mData()}`)
    } 
    else {
      this.s = this
      this.ready = true
      this.currentId = this.uid()
    }
  }
}
</script>