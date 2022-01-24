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
                :code="code"
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
import cssConvertToJs from './addons/css-js-converter'
import jsToCss from './addons/js-css-converter'
export default {
    data: () => ({
        code: ''
    }),
    mounted() {
        const parentElement = this.$parent
        const tileCustomStyleObject = parentElement.tiles[parentElement.nodeSelectedIndex].customStyle
        console.log('saf', jsToCss(tileCustomStyleObject).replace(' ','\n\t'))
        const cssString = `${parentElement.tiles[parentElement.nodeSelectedIndex].id} {\n \t${jsToCss(tileCustomStyleObject)} \n}`
        this.code = cssString
    },
    methods: {
        apply() {
            const cssStringCodeFromEditor = this.$refs.co.getCode()
            const cssConvertedToJs = cssConvertToJs(cssStringCodeFromEditor)
            const cssObject = cssConvertedToJs.values

            const parentElement = this.$parent
            parentElement.tiles[parentElement.nodeSelectedIndex].customStyle = cssObject
        }
    }
}
</script>