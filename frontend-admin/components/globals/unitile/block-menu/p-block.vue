<template>
    <main  style="text-wrapping: wrap; overflow: auto;" >
        <div class="fullwidth overflow-auto padright050 borderred" style="max-height: 400px;" >
            <tiptap-editor></tiptap-editor>
        </div>
    </main>

</template>

<script>
import TiptapEditor from '../rich-text-editor/TiptapEditor.vue'

export default {
    components:{TiptapEditor},
    props: ['value','block'],
    data: () => ({
        text: undefined,
        headingOptions: [
            {title: 'h1'},
            {title: 'h2'},
            {title: 'h3'},
            {title: 'h4'},
            {title: 'h5'},
            {title: 'h6'},
        ],
        childNodeTarget: undefined,
        selectionIsStarting: false,
        richTextEditor: undefined,
        textxAreaValue: undefined
    }),
    watch: {
        
    },
    methods: {
        textChange() {
            // normalize nodes
            console.log('text change')
            
        },  
        selectstart()
        {
            console.log('*** selection start')
            this.selectionIsStarting = true

            const rootNode = document.getElementById('wp-rich-text')
            console.log(rootNode.childNodes.length)
            for(var i=0; i< rootNode.childNodes.length; i++){
                var child = rootNode.childNodes[i];
                
                // child.id = `wp-rt-${i}`

                const p = document.createElement('p')
                p.innerHTML = child.innerHTML

                // child.replaceWith(p)
            }
        },
        getHighlightedNodes(firstNodeSelected, lastNodeSelected)
        {
            // using firstNodeSelected and lastNodeSelected get the inbetween nodes
            console.log('firstNode', firstNodeSelected)
            console.log('lastNode', lastNodeSelected)
            console.log('parentNode', document.getElementById('wp-rich-text').childNodes )

            const rootNode = document.getElementById('wp-rich-text')
            for(var i=0; i< rootNode.childNodes.length; i++){
                var child = rootNode.childNodes[i];
                child.id = `wp-rt-${i}`

                if(i == 0) {
                    const n = document.createElement('p')
                    // rootNode.appendChild(n)
                }
            }
        },
        onmouseup() 
        {
            if(this.selectionIsStarting) {

                let selection = document.getSelection();
                let {anchorNode, anchorOffset, focusNode, focusOffset, type} = selection;
                if(type == 'Range') {
                    // let highlightedNodes =  this.getHighlightedNodes(anchorNode.parentNode,focusNode.parentNode)
                    console.log('*** selection end')
                }

                this.$nextTick(() => {
                    this.selectionIsStarting = false
                })
            }
            
        },
        replaceAt(str,index,chr) 
        {
            if(index > str.length-1) return str;
            return str.substring(0,index) + chr + str.substring(index+1);
        },
        createNewLine()
        {
            console.log('creating new line')
            const div = document.createElement('div')
            const richTextEditor = document.getElementById('wp-rich-text')
            div.innerText = 'hello'
            div.classList.add('borderred')
            richTextEditor.insertBefore(div,null)
        }
    },
    mounted() {
        this.text = this.block.value
        const blockMenuElement = document.getElementById('block-menu')
        blockMenuElement.onmouseup = () => this.onmouseup()
        this.richTextEditor = document.getElementById('wp-rich-text')
    }
}
</script>