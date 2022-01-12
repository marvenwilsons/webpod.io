<template>
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
                    {{log.type == undefined ? '￫' : '' }}
                    {{log.msg}}
                </div>
                <div style="height: 15px;" :id="`wp-lastLog-${currentUid}`" ></div>
            </div>
        </div>
    </div>
</template>

<script>
import m from '@/m'
export default {
    mixins: [m],
    props: ['logWindowIsShowing','outputLogs'],
    props: {
        logWindowIsShowing: {type: Boolean, default: false},
        outputLogs: {type: Array, default() {
            return []
        }}
    },
    data: () => ({
        logs: [],
        currentUid: '',
        documentation: {
            properties: {
                outputLogs: `<Array> an array of string to be displayed in the log window`,
                logWindowIsShowing: '<Boolean> Hides and shows the log window'
            },
            methods: {
                log: `<Function> pushes a new log to the logs array.`
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
    },
    mounted() {
        this.logs = this.outputLogs
        this.currentUid = this.uid()
    }
}
</script>

<style>

</style>