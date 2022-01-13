<template>
    <section  class="relative" >
        <div v-if="err" class="pad025" style="border-left: 5px solid red; color: red; font-family: Menlo;">
            {{err}}
        </div>
        <main class="relative" style="border: 1px solid #dfe7ed;" >
            <div v-if="playable && playButtonIsShowing"  class="absolute pointer pad025" style="z-index: 100; right: 0;">
                <el-tooltip v-if="this.useCmdLine" class="pad025" content="open console" effect="light" placement="top-start" >
                    <svg v-if="this.useCmdLine" @click="openConsole" class="playable-editor-btn-filled" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z" />
                    </svg>
                </el-tooltip>
                <el-tooltip class="pad025" content="play code" effect="light" placement="top-start" >
                    <svg @click="onPlay" class="playable-editor-btn-filled" style="width:24px;height:24px; " viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                </el-tooltip>
            </div>
            <div role="execution mask" v-if="showExectionMaskIndicator" style="background:#86a6bd70; z-index: 101;" class="fullwidth fullheight-percent absolute" >
                <div v-if="executionIsStoppable" class="flex fullwidth flexend" ><el-button @click="$emit('onStopExecutionRequest')">stop execution</el-button></div>
                <div class="flex flexcenter fullheight-percent" ><playingAnimation/></div>
            </div>
            <textarea :id="`cm-editor${currentUid}`" />
        </main>
        <!-- log window -->
        <logWindow
            :logWindowIsShowing="logWindowIsShowing"
            :logs="logs"
            :useCmdLine="useCmdLine"
            ref="logWindow"
            @onCmd="onCmd"
            @closeConsole="closeConsole"
        ></logWindow>
    </section>
</template>

<script>
// https://michaelsboost.com/kodeWeave/editor/#d956c96bdee0cdd1ce9193aee78353ac
// https://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
// https://github.com/emmetio/codemirror-plugin
// https://codemirror.net/2/demo/matchhighlighter.html
import m  from '@/m'
import playingAnimation from './playing-animation.vue'
import logWindow from './log-window.vue'
export default {
    components: {playingAnimation, logWindow},
    props: ['code','lang','readOnly','playable', 'err', 'codemirrorProps', 'hintHanlder','executionIsStoppable','convertCodeAsFunctionOnPlay', 'useCmdLine'],
    mixins: [m],
    data: () => ({
        ready:true,
        currentUid: undefined,
        _code: '// silent',
        showExectionMaskIndicator: false,
        logs: [],
        playButtonIsShowing: true,
        hasADuplicateLog: false,
        logWindowIsShowing: false,
        documentation: {
            properties: {
                code: '<String> The initial code value that will presented in the code editor. Default is empty.',
                lang: '<String> The language mode of code editor, available langunage are, text, javascript, css, html',
                readOnly: '<Boolean> If set to true, user will not be able to update or write in the code editor. Default value is false.',
                playable: '<Boolean> if set to true',
                codemirrorProps: '<Object> codemirror native properties that will be embbeded on run time.',
                hintHanlder: '<Function> A function that executes everytime user types something in editor that passes a userCurrentInput and userInputHintList to manage the hinting.',
                convertCodeAsFunctionOnPlay: '<Function> Convert the code string into function onPlay',
                useCmdLine: `<Boolean> Enables command line input`
            },
            events: {
                onChange: '<{code,editor}> Dispatched every user input',
                onPlay: "<code:string,stopExecution:function> Dispatched whenever the editor's play button is clicked",
                onBlur: "<codeMirrorInstance> Fires whenever the editor is unfocused.",
                onFocus: "<codeMirrorInstance> Fires whenever the editor is focused.",
                onStopExecutionRequest: 'Executes a user defined functon when the stop execution button is clicked.'
            }
        }
    }),
    methods: {
        onChange(code,editor) {
            this.$emit('onChange', {code, editor})
        },
        onBlur(codeMirrorInstance) {
            this.$emit('onBlur', codeMirrorInstance)
        },
        onFocus(codeMirrorInstance) {
            this.$emit('onFocus',codeMirrorInstance)
        },
        onPlay() {
            const convertedCodeToFunction = new Function(`return ${this._code || this.code}`)
            const c = this.convertCodeAsFunctionOnPlay == true ? convertedCodeToFunction : this._code || this.code
            
            this.showExectionMaskIndicator = true
            if(this.playable == true) {
                this.logWindowIsShowing = true
                this.playButtonIsShowing = false
                setTimeout(() => {
                    const logWindow = this.$refs.logWindow
                    this.$emit('onPlay', {code: c, stop: this.stopExecution, log: logWindow.log})
                    logWindow.logs.push({
                        type: undefined,
                        msg: "executing code ..."
                    })
                },0)
            }

            // if cmd line is enabled
            if(this.$refs.logWindow.useCmdLine == true) {
                this.$refs.logWindow.showCmdLine = false
                this.$refs.logWindow.scrollToBottomIsActive = true
            }
        },
        stopExecution() {
            this.showExectionMaskIndicator = false
            this.playButtonIsShowing = true
            this.$refs.logWindow.logs.push({
                type: 'info',
                msg:`execution done.` 
            })
            
            // if cmd line is enabled
            if(this.$refs.logWindow.useCmdLine == true) {
                this.$refs.logWindow.showCmdLine = true
                this.$refs.logWindow.cmdFocus()
            }
        },
        hintManager(userCurrentInput,userInputHintList) {
            if(this.hintHanlder && typeof this.hintHanlder == 'function') {
                this.hintHanlder(userCurrentInput,userInputHintList)
            }
        },
        // component logic methods
        resetLogWindowBehaviour() {
            setTimeout(() => {
                const logWindow = this.$refs.logWindow
                logWindow.scrollToBottomIsActive = true
            }, 100)
        },
        onCmd(cmd) {
            const convertedCodeToFunction = new Function(`return ${this._code || this.code}`)
            const c = this.convertCodeAsFunctionOnPlay == true ? convertedCodeToFunction : this._code || this.code
            const logWindow = this.$refs.logWindow
            if(cmd != undefined) {
                logWindow.log(cmd)
                this.$emit('onCmd',{
                    cmd: cmd,
                    code: c,
                    log: logWindow.log,
                    ...webpod
                })
            } else if(cmd == '' || cmd.trim() == '') {
                logWindow.log('_')
            } 
            
            if(cmd == 'clear') {
                logWindow.resetLogWindowBehaviour()
            }

            if(cmd == 'code play') {
                this.onPlay()
            }
        },
        openConsole() {
            if(this.useCmdLine) {
                const logWindow = this.$refs.logWindow
                logWindow.showCmdLine = true
                this.logWindowIsShowing = true
                logWindow.cmdFocus()
            }
        },
        closeConsole() {
            if(this.useCmdLine) {
                this.logWindowIsShowing = false
            }
        }
    },
    mounted() {
        this.currentUid = this.uid()
        setTimeout(() => {
            const codeMirrorEditorInstance = CodeMirror.fromTextArea(document.getElementById(`cm-editor${this.currentUid}`), {
                tabSize: 4,
                mode: this.lang || 'javascript',
                theme: this.theme || 'default', //mdn-like, monokai, default, base16-light
                lineNumbers: false,
                lineWrapping: true,
                line: true,
                autoCloseTags: true,
                indentUnit: 4,
                indentWithTabs: true,
                showCursorWhenSelecting: this.readOnly == true ? true : false,
                selectionsMayTouch: true,
                autocorrect: true,
                spellcheck: true,
                autofocus: false,
                matchBrackets: true,
                autoCloseBrackets: true,
                foldGutter: true,
                tabMode: "indent",
                fixedGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                lint: false,
                autoRefresh: true,
                readOnly: this.readOnly != undefined ? this.readOnly : true,
                showCursorWhenSelecting: this.readOnly != undefined && this.readOnly == true ? true : false,
                styleActiveLine: false,
                styleActiveSelected: true,
                ...this.codemirrorProps,
                highlightSelectionMatches: {
                    minChars: 1,
                    style:'matchhighlight'
                },
            })

            // Register code value
            codeMirrorEditorInstance.getDoc().setValue(this.code || `// silent`)

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
            CodeMirror.hint.javascript = (cm /** { curOp, display, doc, getTextArea, options, save, state, toTextArea _handlers } */) => {
                const userInputHint = codeMirrorJavascriptHintMethod(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
                const userCurrentInput = cm.display.input.prevInput
                this.hintManager(userCurrentInput,userInputHint.list)
                return userInputHint;
            };

            // on change event
            codeMirrorEditorInstance.on('change', (editor) => {
                const code = editor.getValue()
                this._code = code
                this.onChange(code,editor)
            })
            // on focus event
            codeMirrorEditorInstance.on('focus', (editor) => {
                this.onFocus(editor)
            })
            // on blur event
            codeMirrorEditorInstance.on('blur', (editor) => {
                this.onBlur(editor)
            })
            // hide cursor on readonly
            if(this.readOnly == true || this.readOnly == undefined) {
                const codeMirrorElement = codeMirrorEditorInstance.getWrapperElement()
                codeMirrorElement.classList.add('CodeMirror-readonly');
            }
            // refresh on load
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
    font-size: 13px;
}
.CodeMirror-linenumber {
    padding: 1px 8px 0 5px;
    /* color: #266564 !important; */
    font-size: 13px;
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
.cm-matchhighlight {
  background: #d7d4f0 !important
}
.CodeMirror-activeline-background {
    background: #f1f6fb !important;
    border-left: 4px solid #c0d5ec;
}
.CodeMirror-code {
    margin-left: 1px !important;
}
.playable-editor-btn-filled:hover {
    color: #86a6bd;
    transition: 0.3s;
}
.playable-editor-btn-filled {
    color: #86a6bd70;
}
.CodeMirror-readonly .CodeMirror-cursor {
  display: none !important
}
</style>