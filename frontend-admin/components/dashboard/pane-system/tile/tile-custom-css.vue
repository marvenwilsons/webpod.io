<template>
    <div class="flex flexcol" >
        <span class="overline" > TILE CUSTOM STYLE </span>
        <span class="margintop050 marginbottom125" >
            Style to be applied to this selected tile only.
        </span>
        <div>
            <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
            <codeEditor
                :readOnly="false"
                :lang="'javascript'"
                @onChange="change"
                ref="co"
            ></codeEditor>
        </div>
    </div>
</template>

<script>
import cssConvertToJs from './css-js-converter'
export default {
    methods: {
        change(e) {
            console.log(e)
        }
    },
    mounted() {
        console.log(this.$refs.co.documentation)
    }
}
</script>