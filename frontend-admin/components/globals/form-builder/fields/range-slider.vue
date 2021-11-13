<template>
    <div  @focus="$emit('onFucos',_key), inputIsSelected = true" @blur="inputIsSelected = false" @keypress.enter="onEnter" @keydown="keydown" @focusout="focusout" :tabindex="parseInt(key_index)" @click.right.prevent="" 
    class="select relative fullwidth pad025">
        <div @click="mutate_option_open" class="pointer flex spacebetween">
            <span class="padleft050 fullwidth flex flexcenter flexstart">{{selected_opt}} <span style="color:gray" v-if="!selected_opt" >{{_key}}</span> </span>
            <div :style="{color:appearance.select_arrow_down_color, background: appearance.values_bg_color}" class="padright025 flex flexcol flexcenter">
                <div class="fullwidth" :style="{color:appearance.select_arrow_down_color, }" >
                    <div>
                        <svg style="width:23px;height:23px; padding-top:5px;" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div id="option-container" :style="{background: appearance.select_option_bg, left: '-0.1%', top: '100%'}"  :class="['section absolute fullwidth bordergray', option_open ? '' : 'collapsed']">
            <div style="padding-top:1px;" >
                <div 
                    :style="{color: appearance.color, background: get_selected_opt == opt ? appearance.select_option_hover_bg : '' || hovered_opt == opt ? appearance.select_option_hover_bg : '', marginBottom:'1px'}" 
                    @mouseover="hovered_opt = opt"
                    @mouseleave="hovered_opt = undefined"
                    @click="select_opt(opt)" 
                    class="pointer pad025" 
                    v-for="opt in data.options" 
                    :key="`t-${opt}`">
                    <div class="padleft050" >{{opt ? opt : _key}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "_key", "appearance", "key_index", "disabled"],
    data: () => ({
        option_open: false,
        selected_opt: undefined,
        hovered_opt: undefined,
        inputIsSelected: false,
        currentValue: undefined
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
        get_selected_opt(current,prev) {
            
            this.currentValue = this.data.options.indexOf(current)

            this.$emit("onChange", {
                err: null,
                data: this.data.options.indexOf(current),
                key: this._key
            })
        },
        inputIsSelected(n) {
            if(this.inputIsSelected) {
                this.$parent.isActive = true
            } else {
                this.$parent.isActive = false
            }
        }
    },
    methods: {
        onEnter() {
            this.option_open = !this.option_open
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
            this.option_open = !this.option_open
        },
        select_opt(opt) {
            this.selected_opt = opt
            this.option_open = false            
        }
    },
    mounted() {
        this.selected_opt = this.data.options[this.data.value]
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
.select:focus {
    border: 1px solid white;
}
</style>