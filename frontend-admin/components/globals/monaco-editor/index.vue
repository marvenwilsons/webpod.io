<template>
      <div v-if="ready" id="app">
      <MonacoEditor
        width="100%"
        height="400"
        theme="vs-dark"
        language="javascript"
        :options="options"
        :value="code"
        @change="onChange"
      ></MonacoEditor>
    </div>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
export default {
  name: "App",
  props: ['code'],
  components: {
    MonacoEditor: () => process.client && import('monaco-editor-vue')
  },
  data: () => ({
    ready: true,
    options: {
      //Monaco Editor Options
      language: 'javascript',
      fontSize: "16",
      fontFamily: "monospace",
      fontWeight: 800,
      formatOnPaste: true,
    },
    value: undefined
  }),
  methods: {
    onChange(value) {
      // emit change here, to be reflected
      // console.log(value);
    }
  },
  mounted() {
    this.ready = true
    // setTimeout(() => {
    //   this.ready = false
    //   setTimeout(() => {
    //     this.ready = true
    //   },500)
    // },10)
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