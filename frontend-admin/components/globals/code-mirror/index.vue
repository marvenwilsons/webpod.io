<template>
    <section  class="relative" >
        <div v-if="err" class="pad025" style="border-left: 5px solid red; color: red; font-family: Menlo;">
            {{err}}
        </div>
        <main class="relative" style="border: 1px solid #dfe7ed;" >
            <div v-if="playable && playButtonIsShowing" @click="onPlay" class="absolute pointer pad025" style="z-index: 100; right: 0;">
                <svg class="playable-editor-btn-filled" style="width:24px;height:24px; " viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
            </div>
            <div role="execution mask" v-if="showExectionMaskIndicator" style="background:#86a6bd70; z-index: 101;" class="fullwidth fullheight-percent absolute" >
                <div v-if="executionIsStoppable" class="flex fullwidth flexend" ><el-button @click="$emit('onStopExecutionRequest')">stop execution</el-button></div>
                <div class="flex flexcenter fullheight-percent" ><playingAnimation/></div>
            </div>
            <textarea :id="`cm-editor${currentUid}`" />
        </main>
        <!-- log window -->
        <div v-if="logWindowIsShowing" style="background: #f1f6fb; font-family: Menlo; min-height: 200px;" class="text-small2 pad025 relative fullheight-percent flex flexcol" >
            <div>
                <div class="flex spacebetween flexcenter" style="right: 0;" >
                    <div>
                        <span class="text-small" >OUTPUT LOG</span>
                    </div>
                    <div>
                        <svg @click="logs = [], resetLogWindowBehaviour()" class="pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#c2c6cb" d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                        </svg>
                        <!-- <svg @click="logWindowIsShowing = false" class="pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#c2c6cb" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg> -->
                    </div>
                </div>
            </div>
            <div @scroll="scrollToBottomIsActive = false" :id="`wp-logWindowParent-${currentUid}`" style="overflow:auto;" class="relative fullheight-percent flex flex1 flexcol" >
                <div :id="`wp-logwindow-${currentUid}`" class="absolute fullheight-percent" >
                    <div :style="{color: log.type == 'success' && 'green' || log.type == 'error' && 'red', fontWeight: 600}" v-for="(log, logIndex) in logs" :key="uid(logIndex)" :id="uid(log)" >
                        {{log.type == 'info' ? 'ℹ' : ''}}
                        {{log.type == 'success' ? '✔' : '' }}
                        {{log.type == 'error' ? '❌' : '' }}
                        {{log.type == undefined ? '>' : '' }}
                        {{log.msg}}
                    </div>
                    <div style="height: 15px;" :id="`wp-lastLog-${currentUid}`" ></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// https://michaelsboost.com/kodeWeave/editor/#d956c96bdee0cdd1ce9193aee78353ac
// https://stackoverflow.com/questions/13744176/codemirror-autocomplete-after-any-keyup
// https://github.com/emmetio/codemirror-plugin
// https://codemirror.net/2/demo/matchhighlighter.html
import m  from '@/m'
import playingAnimation from './playing-animation.vue'
export default {
    components: {playingAnimation},
    props: ['code','lang','readOnly','playable', 'err', 'codemirrorProps', 'hintHanlder','blockEditorOnPlay','executionIsStoppable'],
    mixins: [m],
    data: () => ({
        ready:true,
        currentUid: undefined,
        _code: '// silent',
        showExectionMaskIndicator: false,
        logs: [],
        scrollToBottomIsActive: true,
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
                blockEditorOnPlay: `<Boolean> Disables the editor when the play button is clicked and can only un block the editor when the current process is stop by 
                    clicking the stop button or throwing an error. It also defines an executable callback function stop() in onPlay event handler.`
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
    watch: {
        logs() {
            const lastLog = document.getElementById(`wp-lastLog-${this.currentUid}`)
            const logParentWindow = document.getElementById(`wp-logWindowParent-${this.currentUid}`)
            if(this.scrollToBottomIsActive == true) {
                if(logParentWindow) {
                    if(lastLog) {
                        this.scrollParentToChild(logParentWindow,lastLog)
                    }
                }
            }
        }
    },
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
            this.$emit('onPlay', {code: this._code || this.code, stop: this.stopExecution, log: this.log})
            this.showExectionMaskIndicator = true
            if(this.playable == true) {
                this.logWindowIsShowing = true
                this.playButtonIsShowing = false
                this.logs.push({
                    type: undefined,
                    msg: "executing code ..."
                })
            }
        },
        log(log) {
            if(typeof log == 'string') {
                if(this.hasADuplicateLog == false) {
                    this.logs.push({
                        type: undefined,
                        msg: log
                    })  
                }

                setTimeout(() => {
                    const lastItemLog = this.logs[this.logs.length - 1]
                    const logIndex = this.logs.length - 1
                    

                    if(lastItemLog.msg.split(' ')[0] == log.split(' ')[0] ) {
                        this.hasADuplicateLog = true
                        this.logs[logIndex].msg = log
                    } else {
                        this.hasADuplicateLog = false
                        this.logs.push({
                            type: undefined,
                            msg: log
                        })  
                    }
                }, 0)
            } else if(typeof log == 'object') {
                this.logs.push(log)
            }

            
            
        },
        stopExecution() {
            this.showExectionMaskIndicator = false
            this.playButtonIsShowing = true
            this.logs.push({
                type: 'info',
                msg: 'execution done.'
            })
        },
        hintManager(userCurrentInput,userInputHintList) {
            if(this.hintHanlder && typeof this.hintHanlder == 'function') {
                this.hintHanlder(userCurrentInput,userInputHintList)
            }
        },
        // component logic methods
        resetLogWindowBehaviour() {
            setTimeout(() => {
                this.scrollToBottomIsActive = true
            }, 100)
        },
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