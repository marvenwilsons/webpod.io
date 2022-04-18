export default {
    // manages the text-area
    data: () => ({
        textAreaValue: undefined,
        textArreaCurrentLeftPos: undefined
    }),
    watch: {
        textAreaValue(userInput) {
            /**
             * Determine if the text area value is from
             * 1. user input / keyboard input
             * 2. from copy and paste, usally large body text
             */
            if(userInput) {
                const currentInput = userInput.split('\n')
            currentInput.map((e,i) => {
                if(this.totalLines[i] != undefined) {
                    console.log('ey')
                    this.totalLines[i].lineText = e
                } else {
                    this.totalLines.push({
                        lineText: e
                    })
                }
                
            })
            }
            
        }
    },
    mounted() {
        // on editor load, text area is set focus ready for typing
        const editorsTextArea = document.getElementById('wp-text-editor-textarea')
        // editorsTextArea.focus()
    }
}