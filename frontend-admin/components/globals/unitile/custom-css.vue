<template>
    <div class="flex flexcol" >
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
        isLoading: false,
        ready: false,
        onError: () => {}
    }),
    props: ['cssObject','el_id'],
    mounted() {
        if(this.cssObject && this.el_id) {
            this.setCodeString(this.cssObject,this.el_id)
            setTimeout(() => {
                this.ready = true
            }, 10)
        }
    },
    methods: {
        setCodeString(cssObject,elementId) {
            try {
                // console.log(cssObject)
                const cssString = `${elementId || this.el_id} {\n \t${jsToCss(cssObject)} \n}`
                // console.log(cssString)
                this.code = cssString
            } catch(err) {

            }
        },
        apply() {
            try {
                this.isLoading = true

                const cssStringCodeFromEditor = this.$refs.co.getCode()
                const cssConvertedToJs = cssConvertToJs(cssStringCodeFromEditor)
                const cssObject = cssConvertedToJs.values

                this.$emit('change', cssObject)
                webpod.dash.modal.setData(cssObject)
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            } catch(err) {
                this.isLoading = false
                this.$emit('error',err)
                this.onError(err)
            }
        }
    }
}
</script>