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
        
        <client-only>
            <codeEditor
            :code="data.value"
            :lang="data.lang"
            :readOnly="data.readOnly"
            :playable="data.playable"
            :useCmdLine="data.useCmdLine"
            @onChange="onChange"
            @onPlay="onPlay"
            @onCmd="onCmd"
            ></codeEditor>
        </client-only>
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
        onPlay(cb) {
            if(this.data.hooks && this.data.hooks.onPlay) {
                this.data.hooks.onPlay(cb)
            }
        },
        onCmd(cb) {
            if(this.data.hooks && this.data.hooks.onCmd) {
                this.data.hooks.onCmd(cb)
            }
        }
    },
}
</script>