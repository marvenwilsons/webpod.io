<template>
    <div class="flex flexcol" >
        <span class="overline" > TILE CUSTOM STYLE </span>
        <span class="margintop050 marginbottom125" >
            Style to be applied for this selected tile only.
        </span>
        <div>
            <codeEditor
                :readOnly="false"
                :lang="'css'"
                ref="co"
            ></codeEditor>
        </div>
        <div class="flex flexend margintop025" >
            <div @click="apply" class="caption pad025 paneBorder flat_action" >
                APPLY
            </div>
        </div>
    </div>
</template>

<script>
import cssConvertToJs from './css-js-converter'
export default {
    mounted() {
        console.log(this.$refs.co.documentation)
    },
    methods: {
        apply() {
            const cssStringCodeFromEditor = this.$refs.co.getCode()
            const cssConvertedToJs = cssConvertToJs(cssStringCodeFromEditor)
            console.log('css to js ', cssConvertedToJs.values)
        }
    }
}
</script>