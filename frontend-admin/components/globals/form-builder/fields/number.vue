<template>
    <div class="flex flexcenter" >
        <div v-if="data.appendBefore" style="color: #616161" class="marginleft050" >{{data.appendBefore}}</div>
        <input 
        @focus="$emit('onFucos',_key), inputIsActive = true"
        @blur="inputIsActive = false" 
        :tabindex="parseInt(key_index)" 
        :placeholder="number_placeholder" 
        v-model="number_v_model" 
        :style="{border:'none',outline:'none', color: color.color}" 
        class="fullwidth padleft025 dq-inp-objtfy pad050 padleft050" 
        type="number" 
        />
        <div v-if="data.appendAfter" style="color: #616161" class="marginright050" >{{data.appendAfter}}</div>
    </div>
</template>

<script>
import m from '../lib/m'
export default {
    mixins: [m],
    props: ["data", "_key", "color", "key_index", "disabled"],
    data: () => ({
        number_v_model: undefined,
        number_placeholder: undefined,
        inputIsActive: false
    }),
    watch: {
        number_v_model(current_input,prev_input){
            if (this.data.max < current_input) {
                this.$emit("onChange", {
                    err: `The value of ${this._key} exceeds the defined maximum value of ${this.data.max}`,
                    data: null,
                    key: this._key
                })
            } else if (this.data.min > current_input) {
                this.$emit("onChange", {
                    err: `The value of ${this._key} outstep's the defined minimum value of ${this.data.max}`,
                    data: null,
                    key: this._key
                })
            } else {
                if(this.inputIsActive == true) {
                    this.$emit("onChange", {
                        err: null,
                        data: current_input,
                        key: this._key
                    })
                }
            }
        },
        inputIsActive() {
            if(this.inputIsActive) {
                // console.log('number is avtive')
                this.$parent.isActive = true
            } else {
                // console.log('number is blur')
                this.$parent.isActive = false
                this.activateInputHooks(this.number_v_model,'onBlur')
            }
        }
    },
    mounted() {
        if(this.data.value){
            this.number_v_model = this.data.value
        } else {
            this.number_placeholder = 'none'
        }
    }
}
</script>