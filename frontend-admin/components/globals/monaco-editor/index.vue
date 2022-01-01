<template>
      <div v-if="ready" id="app">
      <MonacoEditor
        width="100%"
        theme="vs-dark"
        :height="height || '400px'"
        :options="options"
        :value="code"
        :hints= "[
        'function'
        ]"
        @change="onChange"
        style="font-family: Monaco;"
      ></MonacoEditor>
    </div>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
export default {
  name: "App",
  props: ['code','lang', 'readOnly','height'],
  components: {
    MonacoEditor: () => process.client && import('monaco-editor-vue')
  },
  data: () => ({
    ready: true,
    options: {
      //Monaco Editor Options
      language: 'javascript',
      fontSize: "13",
      fontFamily: "monospace",
      fontWeight: 800,
      formatOnPaste: true,
      readOnly: true,
    },
    value: undefined
  }),
  methods: {
    onChange(value) {
      // emit change here, to be reflected
      this.$emit('onChange', value)
    }
  },
  mounted() {
    // if(process.client) {
    //   const m = import('monaco-editor-vue')
    //   console.log(m)
    // }
    if(this.lang) {
      this.options.language = this.lang
    }

    if(this.readOnly) {
      this.options.readOnly = this.readOnly
    }

    setTimeout(() => {
      this.ready = true
    })
    this.value =
`(paneCollection,pane,view,paneIndex) => ({
    /** 
     * paneCollection. (paneCollection methods)
     *    - insert(paneServiceObject)
     *    - remove()
     *    - getServiceObject('name')
     * 
     * pane. (pane methods)
     *    - setPaneTitle('title here')
     *    - setPaneData('url',cb)
     *    - spawnModal({}) -> view, viewConfig, modalConfig
     * 
     * view. (view methods)
     *    - setView('simpleNavs')
     *    - setViewConfig({})
    */
    onMount: function() {
        pane.setPaneData('url',(data) => {
          // should always return a data
          return data
        })
    },
    onModalEvent: function(event,paneData) {

    },
    onViewEvent: function(event,paneData) {
        if(event.eventName == 'onEventClick') {
            if(event.context.clickedOn == 'Spawn Error') {

            }
        }
    }
})
`
  }
};
</script>