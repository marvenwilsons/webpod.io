<template>
    <div >
        <div 
            
            @click="focusTextArea"
            id="wp-rich-text"
            class="relative borderred"
        >   
            <!-- text line -->
            <wp-line 
                class=""
                v-for="(line,lineIndex) in totalLines" 
                :key="uid(line)"
                :lineText="line.lineText"
                :totalLines="totalLines"
                :lineIndex="lineIndex"
                :lineFocus="lineFocus"
                @lineTextChange="hanldeLineTextChange"
            />

            <!-- input text line, textarea -->
           <!-- <div style="top: 0px; z-index: 9000" class="absolute fullwidth" >
                <span class="relative" style="border:1px solid lightgray;" >
                    <div 
                        style="right: 0;"
                        id="wp-text-editor-cursor"
                        class="absolute" 
                    />
                    {{textAreaValue}}
                </span>
                <textarea 
                    class="fullwidth body-1 borderred fullwidth" 
                    id="wp-text-editor-textarea"
                    style="height: 25px; overflow: auto;"
                    v-model="textAreaValue"
                    wrap="off"
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="false"
                />
           </div> -->

        </div>
    </div>
</template>

<script>
import WpLine from './wp-line.vue'
import MixinCursorManager from './mixin-cursor-manager'
import MixinTextAreaManager from './mixin-textarea-manager'
import m from '@/m'
export default {
    components: {
        WpLine
    },
    mixins: [
        m,
        MixinCursorManager,
        MixinTextAreaManager
    ],
    data: () => ({
        totalLines: [
            {
                lineText: 'lorem'
            }
        ],
        lineFocus: 0
    }),
    watch: {
        textAreaValue() 
        {
            // console.log('textArea changed!', this.textAreaValue)
        }
    },
    methods: {
        createNewLine(lineIndexFrom) 
        {
            // when user hits enter key
            console.log('creating new line')
            this.totalLines.push(
                {
                    lineText: ''
                }
            )
            this.$nextTick(() => {
                this.textAreaValue = undefined
                this.lineFocus = lineIndexFrom + 1
            })
        },
        focusTextArea() 
        {
            // document.getElementById('wp-text-editor-textarea').focus()
        },
        hanldeLineTextChange({lineText,lineIndex})
        {
            // this.$set(this.totalLines,lineIndex,{lineText})
            this.totalLines[lineIndex].lineText = lineText
        }
    }
}
</script>

<style>

@keyframes blink {
  50% {
    opacity: 0.0;
  }
}
#wp-text-editor-cursor {
    width:1px !important;
    border-left: 2px solid lightblue;
    height: 24px;
    animation: blink 1s step-start 0s infinite;
}
#wp-rich-text {
    border: 1px solid black;
    height: 150px;
    max-width: 200px;
    overflow: auto;
}
</style>