<template>
    <div>
        <monacoEditor 
          :code="data.value"
          :lang="data.lang"
          :readOnly="data.readOnly"
          :height="data.height"
          @onChange="onChange"
        >
        </monacoEditor>
    </div>
</template>

<script>
import m from '../lib/m'
export default {
    mixins: [m],
    props: ["data", "_key", "color", "key_index", "disabled"],
    data: () => ({

    }),
    methods: {
        onChange(e) {
            this.$emit('onChange',{
                err: null,
                value: e,
                key: this._key
            })
        }
    }
}
</script>