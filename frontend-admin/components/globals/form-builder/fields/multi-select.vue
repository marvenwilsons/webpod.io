<template>
    <div id="dq-multiselect" @focus="$emit('onFucos',_key), inputIsSelected = true" 
    @blur="inputIsSelected = false" @keypress.enter="onEnter" 
    @keydown="keydown" @focusout="focusout" 
    :tabindex="parseInt(key_index)" @click.right.prevent="" 
    class="select relative fullwidth pad025 "
    >
        <div  @click.prevent="mutate_option_open"  class="pointer flex spacebetween">
            <div class="padleft025 fullwidth flex flexwrap">
                <div 
                    :style="{border: `1px solid ${appearance.select_chip_border_color}`, background:appearance.select_chip_bg_color}"
                    class="s_opts padright025 padleft025" 
                    v-for="(so,si) in selected_opts" :key="`${so}-${si}`"
                    @mouseover="onhover(true,si,'s_opts')"
                    @mouseleave="onhover(false,si,'s_opts')"
                    >
                    <div class="flex flexcenter" >
                        <div class="padleft025" >
                            <span style="white-space: nowrap;" >{{so}}</span> 
                        </div>
                        <div 
                        @click.prevent="removeSelection(so)" 
                        @mouseover="onhover(true,si,'s_opts_close')"
                        @mouseleave="onhover(false,si,'s_opts_close')"
                        :style="{border:`1px solid ${appearance.select_chip_border_color}`}" 
                        class="marginleft025 s_opts_close padleft025 padright025 flex flexcenter" 
                        >
                            <span :style="{color: appearance.chip_close}" >
                                <svg style="width:11px;height:11px" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <span style="color:gray" v-if="selected_opts.length == 0" >{{_key}}</span> 
            </div>
            <div 
                :style="{color:appearance.select_arrow_down_color, background: appearance.values_bg_color}" 
                class="padright025 flex flexcol flexcenter">
                <div class="fullwidth" :style="{color:appearance.select_arrow_down_color, }" >
                    <div>
                        <svg style="width:23px;height:23px; padding-top:5px;" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- drop down -->
        <div id="option-container" 
            :style="{background: appearance.select_option_bg, border:`1px solid ${appearance.select_option_border_color}`, left:'-0.2%', top: '100%'}"  
            :class="['section absolute fullwidth bordergray', option_open ? '' : 'collapsed']"
        >
            <div class="" style="padding-top:1px;" >
                <div 
                    :style="{
                        color: appearance.color, 
                        background: selected_opt == opt || hovered_opt == opt? appearance.select_option_hover_bg : '', 
                        marginBottom:'1px'}" 
                    @mouseover="hovered_opt = opt"
                    @mouseleave="hovered_opt = undefined, selected_opt = undefined"
                    @click.self="select_opt(opt)" 
                    class="pointer pad025"
                    v-for="opt in options" 
                    :key="`t-${opt}`">
                    
                    <span class="padleft050" > 
                        <span  v-if="selected_opts.includes(opt)" >
                            <svg style="width:20px;height:20px; padding-top:10px;" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                            </svg>
                        </span>
                        <span :style="{marginLeft: !selected_opts.includes(opt) ? '24px': '' }" >
                            {{opt ? opt : _key}}
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</template>

<script>
import m from '../lib/m'
export default {
    mixins: [m],
    props: ["data", "_key", "appearance", "key_index", "disabled"],
    data: () => ({
        option_open: false,
        selected_opt: undefined,
        selected_opts: [],
        hovered_opt: undefined,
        hovered: false,
        inputIsSelected: false,
        options: []
    }),
    computed: {
        get_selected_opt() {
            return this.selected_opt
        },
        get_option_open_state() {
            return this.option_open
        }
    },
    watch: {

        inputIsSelected(n) {
            this.$parent.isActive = n
        },
        get_selected_opt(current,prev) {
            // this.data.value = this.data.options.indexOf(current)
        },
        selected_opts(n) {
            if(this.inputIsSelected == true) {
                this.$emit("onChange", {
                    err: null,
                    value: this.selected_opts,
                    key: this._key
                })
            }

            if(this.data.hooks) {
                if(this.data.hooks.onInput != undefined) {
                    this.activateInputHooks(n,'onInput', {
                        key: 'multiselect',
                        value: {
                            addOption: this.addOption,
                            setOptions: this.setOptions
                        }
                    })
                }


                if(this.data.hooks.onEmpty != undefined) {
                    if(n.length == 0) {
                        this.activateInputHooks(n,'onEmpty',{
                            key: 'multiselect',
                            value: {
                                addOption: this.addOption,
                                setOptions: this.setOptions
                            }
                        })
                    }
                }
            }
        }
    },
    methods: {
        addOption(e) {
            if(!this.options.includes(e)) {
                this.options.push(e)
            }   
        },
        setOptions(e) {
            if(Array.isArray(e)) {
                this.options = e
            }
        },  
        onEnter() {
            this.option_open = !this.option_open
            if(this.selected_opt) {
                if(this.selected_opts.includes(this.selected_opt) == false) {
                    this.selected_opts.push(this.selected_opt)
                    this.selected_opt = undefined
                } else {
                    const itemLocation = this.selected_opts.indexOf(this.selected_opt)
                    this.selected_opts.splice(itemLocation,1)
                    this.selected_opt = undefined
                }
            }
        },
        onhover(state,index,el_class) {
            this.hovered = state
            switch(el_class) {
                case 's_opts':
                    if(state) {
                        document.getElementsByClassName(el_class)[index].style.background = 
                        this.appearance.select_chip_hover_bg_color

                        document.getElementsByClassName(el_class)[index].style.border = 
                        `1px solid ${this.appearance.color}`
                    } else {
                        document.getElementsByClassName(el_class)[index].style.background = 
                        this.appearance.select_chip_bg_color

                        document.getElementsByClassName(el_class)[index].style.border = 
                        `1px solid ${this.appearance.select_chip_border_color}`
                    }
                break;
                case 's_opts_close':
                    if(state) {
                        document.getElementsByClassName(el_class)[index].style.border = 
                        `1px solid ${this.appearance.color}`
                    } else {
                        document.getElementsByClassName(el_class)[index].style.border = 
                        `1px solid ${this.appearance.select_chip_border_color}`
                    }
                break
            }

            
        },
        removeSelection(el) {
            const elIndex = this.selected_opts.indexOf(el)
            this.selected_opts.splice(elIndex,1)
            this.hovered = false
        },  
        focusout() {
            this.option_open = false
        },
        keydown(e) {
            if(this.option_open) {
                if(e.code == 'ArrowUp') {
                    if(this.selected_opt == undefined) {
                        this.selected_opt = this.data.options[this.data.options.length - 1]
                    } else {
                        // get index of current selected option
                        const currentSelectedOption = this.selected_opt
                        const currentSelectedIndex = this.data.options.indexOf(currentSelectedOption)
                        
                        // if current selected option index is in the start of array go back to 1
                        if(currentSelectedIndex == 0) {
                            const lastIndexOption = this.data.options[this.data.options.length - 1]
                            this.selected_opt = lastIndexOption
                        }
                         // if current selected option index is in not in the end or start
                        else {
                            const indexOfSelected = this.data.options.indexOf(this.selected_opt)
                            this.selected_opt = this.data.options[indexOfSelected - 1]
                        }
                    }
                } else if(e.code == 'ArrowDown') {
                    if(this.selected_opt == undefined) {
                        this.selected_opt = this.data.options[0]
                    } else {
                        // get index of current selected option
                        const currentSelectedOption = this.selected_opt
                        const currentSelectedIndex = this.data.options.indexOf(currentSelectedOption)
                        
                        // if current selected option index is in the end of array go back to 0
                        if(currentSelectedIndex == this.data.options.length - 1) {
                            const indexZeroOption = this.data.options[0]
                            this.selected_opt = indexZeroOption
                        } 
                        // if current selected option index is in the start of array go back to 1
                        else if(currentSelectedIndex == 0) {
                            const goto_next = this.data.options[1]
                            this.selected_opt = goto_next
                        } 
                        // if current selected option index is in not in the end or start
                        else {
                            const indexOfSelected = this.data.options.indexOf(this.selected_opt)
                            this.selected_opt = this.data.options[indexOfSelected + 1]
                        }
                    }
                }
            }
        },
        mutate_option_open() {
            if(this.hovered == false) {
                this.option_open = !this.option_open
            }
        },
        select_opt(opt) {
            if(this.selected_opts.includes(opt) ) {
                this.removeSelection(opt)
            } else {
                this.selected_opt = opt
                this.option_open = false
                this.selected_opts.push(opt)
            }
            
        }
    },
    mounted() {
        this.data.value.map(e => {
            this.selected_opts.push(e)
        })

        this.options = this.data.options

        if(this.data.hooks) {
            if(this.data.hooks.onMount) {
                this.activateInputHooks(this.options,'onMount', {
                    key: 'multiselect',
                    value: {
                        addOption: this.addOption,
                        setOptions: this.setOptions
                    }
                })
            }
        }
    }
}
</script>

<style>
#option-container {
    margin-top: 3px;
    box-shadow: 2px 2px 15px 1px #393e4244;
    z-index: 100;
}
#option-container > div {
    max-height: 250px;
    overflow-x: hidden;
}
.section {
  overflow:hidden;
  transition:transform 0.1s ease-in-out;
  height:auto;
  transform:scaleY(1);
  transform-origin:top;
}
.section.collapsed {
  transform:scaleY(0);
}
.s_opts{
    margin-top: 2px;
    margin-bottom: 2px;
    border-radius: 100px;
    margin-right: 5px;
}
.s_opts:hover{
    background: rgba(128, 128, 128, 0.562);
}
.s_opts_close{
    border-radius: 100%;
    height:16px;
    width:16px;
}
.s_opts_close:hover{
    transition: 0.3s;
}
#option-container{
    border-bottom-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
div, div > *:focus{
    outline: none !important;
}
.borderOff > * {
    border: none !important;
}
</style>