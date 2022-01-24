<template>
    <div class="flex flexcol" >
        <span class="overline" > TILE CUSTOM STYLE </span> <br>
        <span class="marginbottom125 caption" >
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
            <v-btn :loading="isLoading" plain tile @click="apply" class="caption pad025 paneBorder flat_action" >
                APPLY
                <template v-slot:loader>
                    <span>saving ...</span>
                </template>
            </v-btn>
        </div>
    </div>
</template>

<script>
import cssConvertToJs from './addons/css-js-converter'
import jsToCss from './addons/js-css-converter'
export default {
    data: () => ({
        code: '',
        isLoading: false
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
            this.isLoading = true

            const cssStringCodeFromEditor = this.$refs.co.getCode()
            const cssConvertedToJs = cssConvertToJs(cssStringCodeFromEditor)
            const cssObject = cssConvertedToJs.values

            const parentElement = this.$parent
            parentElement.tiles[parentElement.nodeSelectedIndex].customStyle = cssObject

            setTimeout(() => {
                this.isLoading = false
            }, 500)
        }
    }
}
</script>