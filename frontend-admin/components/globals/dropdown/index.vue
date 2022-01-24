<template>
    <el-dropdown  @command="handleCommand" size="small" trigger="click">
        <div class="pad025" >
            <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                <path fill="gray" :d="svgTrigger" />
            </svg>
        </div>
        <el-dropdown-menu  style="font-family: 'Monaco'"  slot="dropdown">
            <el-dropdown-item 
            :divided="divideOptionsBefore && divideOptionsBefore.includes(option.title)"
            :disabled="disabledOptions && disabledOptions.includes(option.title)"
            :command="option.title"  
            v-for="option in options" 
            :key="uid(option)" 
            class="small-text">
                <div class="flex" >
                    <div style="max-width: 20px;min-width: 20px;" class="marginright050 flex flexcenter" >
                        <svg v-if="option.d" style="width:20px;height:20px" viewBox="0 0 24 24">
                            <path fill="gray" :d="option.d" />
                        </svg>
                    </div>
                    <div class="flex flex1 fullwidth" >
                        <div class="fullwidth" >{{option.title}}</div>
                    </div>
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import m from '@/m'
export default {
    name:"wp-dropdown",
    mixins: [m],
    props: ['options','svgTrigger','divideOptionsBefore','disabledOptions'],
    methods: {
        handleCommand(command) {
            this.$emit('command',command)
        }
    }
}
</script>