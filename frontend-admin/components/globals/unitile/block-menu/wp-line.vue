<template>
    <span 
        style="height:25px;" 
        class="wp-line-text body-1 relative"
        @click="handleLineFocus"
        @keydown.enter.prevent="$emit('createNewLine', lineIndex)" 

    >
        <div style=" white-space: nowrap; text-overflow: ellipsis;" class="borderred flex" >
            {{lineText}}
            <div 
            v-if="lineFocus == lineIndex"
            style="right: 0;"
            id="wp-text-editor-cursor"
            />
        </div>
        
        <textarea
            v-if="lineFocus == lineIndex"
            class="fullwidth body-1  fullwidth " 
            id="wp-text-editor-textarea"
            style="height: 25px; overflow: auto;"
            wrap="off"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            @input="inputChange"
            :value="lineText"
        ></textarea>
    </span>
</template>

<script>
export default {
    props: ['lineText','totalLines','lineIndex', 'lineFocus'],
    mounted() {
    },
    methods: {
        inputChange(e) {
            this.$emit('lineTextChange', {
                lineText: e.target.value,
                lineIndex: this.lineIndex
            })
            this.$nextTick(() => {
                console.log('ey')
                document.getElementById('wp-text-editor-textarea').focus()
                const cursor = document.getElementById('wp-text-editor-cursor')
                cursor.scrollIntoView()
            })
        },
        handleLineFocus() {
            document.getElementById('wp-text-editor-textarea').focus()
        }
    }
}
</script>
<style>
.wp-line-text:hover {
    background: #0086c013;
    cursor: text;
}
#wp-text-editor-textarea {
    resize: none;
    /* opacity: 0; */
    /* color: white; */
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
}
</style>