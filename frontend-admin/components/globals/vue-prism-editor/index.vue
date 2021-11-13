<template>
  <div v-if="ready" class="fullwidth fullheight-percent marginbottom050 borderRad4 overflowhidden" >
    <prism-editor class="my-editor fullheight-percent pad125" v-model="content" :tabSize="4" height="100%" :highlight="highlighter" :readonly="true" line-numbers></prism-editor>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor
  },
  props: ['code'],
  data: () => ({ 
    ready: false,
    content: undefined
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    }
  },
  mounted() {
    this.content = this.code
    setTimeout(() => {
      this.ready = true
    },50)
  }
};
</script>

<style>
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: monospace !important;
  font-size: 15px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>