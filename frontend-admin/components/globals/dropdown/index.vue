<template>
    <el-dropdown  @command="handleCommand" size="small" trigger="click">
        <div style="color: #000000de; " class="pointer" >
            <svg v-if="svgTrigger" style="width:20px;height:20px" viewBox="0 0 24 24">
                <path fill="gray" :d="svgTrigger" />
            </svg>
            <slot></slot>
        </div>
        <el-dropdown-menu  style="font-family: 'Roboto'; font-size: 1rem;"  slot="dropdown">
            <el-dropdown-item 
            :divided="divideOptionsBefore && divideOptionsBefore.includes(option.title)"
            :disabled="disabledOptions && disabledOptions.includes(option.title)"
            :command="option.title"  
            v-for="option in options" 
            :key="uid(option)" 
            class=""
            :style="{background: selected && selected == option.title ? '#F5F5F5' : ''}"
            >
                <div class="flex flexcenter padtop025 padbottom025" >
                    <div v-if="!indented_off" style="max-width: 20px;min-width: 20px;" class="marginright050 flex flexcenter" >
                        <svg v-if="option.d" style="width:20px;height:20px" viewBox="0 0 24 24">
                            <path fill="#000000de" :d="option.d" />
                        </svg>
                    </div>
                    <div style="font-weight:400;" class="flex flex1 fullwidth marginleft050 padright050 flexcenter" >
                        <div class="fullwidth" style="color: #000000de; font-size: .875rem;" >{{option.title}}</div>
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
    props: ['options','svgTrigger','divideOptionsBefore','disabledOptions', 'selected'],
    data: () => ({
        indented_off: true
    }),
    methods: {
        handleCommand(command) {
            this.$emit('command',command)
        }
    },
    mounted() {
        this.indented_off = (this.options.map(opt => Object.keys(opt).length == 1)).every(v => v == true)
        
    }
}
</script>

<style>
.el-dropdown-menu__item:hover {
    background: #F5F5F5 !important;
    transition: 0.2s;
}
.popper__arrow {
    display: none !important;
}
</style>