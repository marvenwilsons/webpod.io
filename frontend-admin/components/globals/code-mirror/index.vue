<template>
    <client-only>
        <textarea :id="`cm-editor${currentUid}`" />
    </client-only>
</template>

<script>
// https://michaelsboost.com/kodeWeave/editor/#d956c96bdee0cdd1ce9193aee78353ac
// https://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
// https://github.com/emmetio/codemirror-plugin
import m  from '@/m'
export default {
    props: ['code','lang','theme'],
    mixins: [m],
    data: () => ({
        ready:true,
        currentUid: undefined
    }),
    methods: {
        onChange(code) {
            this.$emit('onChange', code)
        }
    },
    mounted() {
        this.currentUid = this.uid()
        setTimeout(() => {
            const codeMirrorEditorInstance = CodeMirror.fromTextArea(document.getElementById(`cm-editor${this.currentUid}`), {
                tabSize: 4,
                mode: this.lang || 'text',
                theme: this.theme || 'default', //mdn-like, monokai, default, base16-light
                lineNumbers: false,
                lineWrapping: true,
                line: true,
                autoCloseTags: true,
                indentUnit: 4,
                indentWithTabs: true,
                showCursorWhenSelecting: true,
                selectionsMayTouch: true,
                autocorrect: true,
                spellcheck: true,
                autofocus: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                styleActiveLine: true,
                foldGutter: true,
                tabMode: "indent",
                fixedGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                lint: false,
                autoRefresh: true,
                readOnly: false,
            })

            // Register code value
            codeMirrorEditorInstance.getDoc().setValue(this.code || `function myScript(){ \n\treturn 100;\n}\n`)

            // autocomplete hints
            const excludedIntelliSenseTriggerKeys = {
                "8": "backspace",
                "9": "tab",
                "13": "enter",
                "16": "shift",
                "17": "ctrl",
                "18": "alt",
                "19": "pause",
                "20": "capslock",
                "27": "escape",
                "33": "pageup",
                "34": "pagedown",
                "35": "end",
                "36": "home",
                "37": "left",
                "38": "up",
                "39": "right",
                "40": "down",
                "45": "insert",
                "46": "delete",
                "91": "left window key",
                "92": "right window key",
                "93": "select",
                "107": "add",
                "109": "subtract",
                "110": "decimal point",
                "111": "divide",
                "112": "f1",
                "113": "f2",
                "114": "f3",
                "115": "f4",
                "116": "f5",
                "117": "f6",
                "118": "f7",
                "119": "f8",
                "120": "f9",
                "121": "f10",
                "122": "f11",
                "123": "f12",
                "144": "numlock",
                "145": "scrolllock",
                "186": "semicolon",
                "187": "equalsign",
                "188": "comma",
                "189": "dash",
                "190": "period",
                "191": "slash",
                "192": "graveaccent",
                "220": "backslash",
                "222": "quote"
            }
            codeMirrorEditorInstance.on("keyup", function(editor,event) {
                if (
                    !(event.ctrlKey) &&
                    (event.keyCode >= 65 && event.keyCode <= 90) || 
                    (event.keyCode >= 97 && event.keyCode <= 122) || 
                    (event.keyCode >= 46 && event.keyCode <= 57)
                ) {
                    CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
                }
            })
            const codeMirrorJavascriptHintMethod = CodeMirror.hint.javascript;
            CodeMirror.hint.javascript = function(cm /** { curOp, display, doc, getTextArea, options, save, state, toTextArea _handlers } */) {
                const userInputHint = codeMirrorJavascriptHintMethod(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
                const userCurrentInput = cm.display.input.prevInput
                if(userCurrentInput === 'pane.') {
                    const hints = ["showPane","removePane","updatePane"]

                    // custom specific hints
                    hints.map(hint => {
                        if(!userInputHint.list.includes(hint)) {
                            userInputHint.list.push(hint);
                        }
                    })
                }
                
                // console.log('-->', cm.getValue())

                return userInputHint;
            };

            codeMirrorEditorInstance.on('change', (editor) => {
                this.onChange(editor.getValue())
            })

            // refresh
            setTimeout(() => {
                codeMirrorEditorInstance.refresh()
            },50)
        },10)
    }
}
</script>

<style>
.CodeMirror {
    font-family: 'Menlo';
    font-size: 14px;
}
.CodeMirror-linenumber {
    padding: 1px 8px 0 5px;
    /* color: #266564 !important; */
    font-size: 14px;
}
.CodeMirror-matchingbracket {
    color: #20bbfc !important;
}
.cm-keyword{
    color: #c30771 !important;
}
.cm-def, .cm-variable {
    color: #005f87 !important;
}
.cm-property {
    color: #6636b4 !important;
}
.cm-string {
    font-style: normal !important;
    color: #008ec4 !important;
}
/* .cm-s-base16-light.CodeMirror {
    background: #e4f5f5 !important;
} */
.CodeMirror-gutters {
    background: #e7eff8;
    /* width: 20px; */
}

.CodeMirror.cm-s-default {
    background: #f1f6fb !important;
}
.cm-comment {
    color: #828282 !important;
}
</style>