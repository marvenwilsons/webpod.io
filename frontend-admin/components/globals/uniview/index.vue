<template>
  <div v-if="ready" class="flex flexcol" style="gap:1px;" >
    <div
      v-for="(item,index) in myData(s)"
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
    currentId: undefined
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
    if(typeof this.myData != 'function') {
      alert(`Error: uniview's viewData property should be a function that returns an array of view objects not ${typeof this.myData}`)
    } 
    else if(Array.isArray(this.myData()) == false) {
      alert(`Error: uniview's viewData property should be a function that returns an array of view objects not ${typeof this.myData()}`)
    } 
    else {
      this.s = this
      this.ready = true
      this.currentId = this.uid()
    }
  }
}
</script>