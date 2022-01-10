<template>
    <div class="relative" >
        <!-- <div v-if="editorMounted == false"  class="flex flexcenter pad125" >
            loading ...
        </div> -->
        <!-- <monacoEditor 
          :code="data.value"
          :lang="data.lang"
          :readOnly="data.readOnly"
          :height="data.height"
          @onChange="onChange"
          @onMount="onEditorMount"
        >
        </monacoEditor> -->
        
        <codeEditor
          :code="data.value"
          :lang="data.lang"
          :readOnly="data.readOnly"
          :playable="data.playable"
          @onChange="onChange"
          @onPlay="onPlay"
        ></codeEditor>
    </div>
</template>

<script>
import m from '../lib/m'
export default {
    mixins: [m],
    props: ["data", "_key", "color", "key_index", "disabled"],
    data: () => ({
        editorMounted: false
    }),
    methods: {
        onEditorMount(e) {
            this.editorMounted = e
        },
        onChange(e) {
            this.$emit('onChange',{
                err: null,
                value: e.code,
                key: this._key
            })
        },
        onPlay(code) {
            console.log('code', code)
        }
    },
    mounted() {
        // webpod.dashboardMethods.alert(`
        // <h1>hello world</h1>
        // `)
    }
}
</script>