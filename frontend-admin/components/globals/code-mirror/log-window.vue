<template>
    <div v-if="logWindowIsShowing" style="background: #f1f6fb; font-family: Menlo; min-height: 200px;" class="text-small pad025 relative fullheight-percent flex flexcol" >
        <div>
            <div class="flex spacebetween flexcenter" style="right: 0;" >
                <div>
                    <span class="text-small" >OUTPUT LOG</span>
                </div>
                <div>
                    <el-tooltip class="pad025" content="clear log" effect="light" placement="top-start" >
                        <svg @click="resetLogWindowBehaviour()" class="pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#c2c6cb" d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                        </svg>
                    </el-tooltip>
                    <el-tooltip class="pad025" content="close console" effect="light" placement="top-start" >
                        <svg @click="closeConsole()" class="pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#c2c6cb" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div @scroll="scrollToBottomIsActive = false" :id="`wp-logWindowParent-${currentUid}`" style="overflow:auto;" class="relative fullheight-percent flex flex1 flexcol" >
            <div :id="`wp-logwindow-${currentUid}`" class="absolute fullheight-percent flex flexcol fullwidth" >
                <div :style="{color: log.type == 'success' && 'green' || log.type == 'error' && 'red'}" v-for="(log, logIndex) in logs" :key="uid(logIndex)" :id="uid(log)" >
                    {{log.type == 'info' ? 'ℹ' : ''}}
                    {{log.type == 'success' ? '✔' : '' }}
                    {{log.type == 'error' ? '❌' : '' }}
                    {{log.type == undefined ? '›' : '' }}
                    {{log.msg}}
                </div>
                <div class="fullwidth flex" style="min-height: 15px; max-height: 15px;" :id="`wp-lastLog-${currentUid}`" >
                    <div v-if="showCmdLine && useCmdLine" class="fullwidth flex" >
                        <div class="flex" >
                            <span style="align-self: flex-end;" class="marginright025" >»</span> 
                            <input :id="`cmdinput-${currentUid}`" style="align-self: flex-end;" @keypress.enter="cmdEnter" v-model="cmd" class="fullwidth" type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import m from '@/m'
export default {
    mixins: [m],
    props: {
        logWindowIsShowing: {type: Boolean, default: false},
        outputLogs: {type: Array, default() {
            return []
        }},
        useCmdLine: {type: Boolean, default: false}
    },
    data: () => ({
        logs: [],
        currentUid: '',
        showCmdLine: false,
        scrollToBottomIsActive: true,
        _logWindowIsShowing: undefined,
        documentation: {
            properties: {
                outputLogs: `<Array> an array of string to be displayed in the log window`,
                logWindowIsShowing: '<Boolean> Hides and shows the log window',
                useCmdLine: `<Boolean> Enables command line input`,
            },
            methods: {
                log: `<Function> pushes a new log to the logs array.`, 
                cmdFocus: `<Function> When executed the input will be focused`
            }
        },
        cmd: ''
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
        },
        
    },
    methods: {
        log(log) {
            if(typeof log == 'string') {
                if(this.hasADuplicateLog == false) {
                    this.logs.push({
                        type: undefined,
                        msg: log
                    })  
                }

                setTimeout(() => {
                    if(this.logs.length > 1) {
                        const lastItemLog = this.logs[ this.logs.length - 1]
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
                    } else {
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
        resetLogWindowBehaviour() {
            this.logs = []
        },
        cmdEnter() {
            this.$emit('onCmd',this.cmd)
            setTimeout(() => {
                this.cmd = ''
            },0)

        },
        cmdFocus() {
            setTimeout(() => {
                document.getElementById(`cmdinput-${this.currentUid}`).focus()
            },10)
        },
        closeConsole() {
            this.$emit('closeConsole')
        }
    },
    mounted() {
        this.logs = this.outputLogs
        this.currentUid = this.uid()
    }
}
</script>

<style>
.el-tooltip__popper.is-light{
    font-family: 'Menlo';
    padding: 10px !important;
}
.el-tooltip__popper.is-dark{
    font-family: 'Menlo';
    padding: 10px !important;
}
</style>