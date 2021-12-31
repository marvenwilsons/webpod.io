<template>
    <div v-if="ready" class="" >
        <entry
            @onChange="onchange"
            @onError="onerror"
            @onSubmit="submit"
            @onEmpty="onempty"
            @onRemoveProp="onremoveprop"
            @onData="ondata"
            @updateInputValue="updateInputValue"
            :hooks="hooks"
            :config="{
              operation: 'rw',
              useColorMode: false,
              data: d,
              globalConfig: {...config}
            }"
        >
        </entry>
    </div>
</template>

<script>
import entry from './entry.vue'
export default {
  components: {entry},
  props: ['myData','config', 'paneIndex', 'hooks'],
  
  data: () => ({
    value: undefined,
    d: undefined,
    ready: false
  }),
  created() {
    this.d = this.myData
  },
  mounted() {
    let finalData = {}

    // setting operation type
    if(this.config != undefined && this.config.operation != undefined) {
      Object.entries(this.d).forEach(([key, value]) => {
        finalData[key] = {
          ...value,
          operation: this.config.operation
        }
      })
    } else if(this.config.operation == undefined) {
      Object.entries(this.d).forEach(([key, value]) => {
        finalData[key] = {
          ...value,
          operation: 'w'
        }
      })
    }

    // display
    this.d = finalData
    this.ready = true
  },
  methods: {
    onerror() {

    },
    onchange(e) {
    },
    onempty() {

    },
    onremoveprop() {

    },
    submit() {

    },
    ondata(e) {
      // console.log(e)
    },
    updateInputValue({key,value}) {
      this.myData[key].value = value
      this.d = this.myData
    }
  }
}
</script>