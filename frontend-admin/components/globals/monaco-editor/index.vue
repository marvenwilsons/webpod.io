<template>
      <div v-if="ready" id="app">
      <MonacoEditor
        width="100%"
        theme="vs-light"
        :height="height || '400px'"
        :options="options"
        :value="code"
        @change="onChange"
        :editorMounted="editorDidMount"
      ></MonacoEditor>
    </div>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';
// https://www.npmjs.com/package/monaco-editor-vue
// https://bestofreactjs.com/repo/suren-atoyan-monaco-react-react-rich-text-editing
// https://programmer.help/blogs/using-monaco-to-realize-code-highlighting-in-vue-element.html
export default {
  name: "App",
  props: ['code','lang', 'readOnly','height'],
  components: {
    // MonacoEditor: () => process.client && import('monaco-editor-vue')
  },
  data: () => ({
    ready: true,
    options: {
      //Monaco Editor Options
      language: 'javascript',
      fontSize: "13",
      fontFamily: "Monaco",
      fontWeight: 800,
      formatOnPaste: true,
      readOnly: false,
    },
    value: undefined
  }),
  methods: {
    onChange(value) {
      // emit change here, to be reflected
      this.$emit('onChange', value)
    },
    editorDidMount(editor) {
      this.$emit('onMount', true)
      console.log('editor', editor)
    }
  },
  mounted() {
    if(process.client) {
      // const m = import('monaco-editor-vue')
      // console.log(m)
    }
    if(this.lang) {
      this.options.language = this.lang
    }

    this.options.readOnly = this.readOnly

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