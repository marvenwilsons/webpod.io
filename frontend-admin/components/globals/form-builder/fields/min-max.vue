<template>
    <div 
      @focus="$emit('onFucos',_key)"
     class="flex" >
        <div :style="{borderRight: `1px solid ${appearance.divider_border_color}`}" class="flex1 flex" >
            <span class="padleft050" >
                <small :style="{color: appearance.keys_text_color}" >
                    min
                </small>
            </span>
            <input @focus="inputIsSelected = true" @blur="inputIsSelected = false"  :tabindex="parseInt(key_index.split(',')[0])"  v-model="min" :style="{border:'none',outline:'none', color: color.color}" class="fullwidth padleft025 dq-inp-objtfy pad025" type="number" />
        </div>
        <div class="flex1 flex" >
            <span class="padleft050" >
                <small :style="{color: appearance.keys_text_color}" >
                    max
                </small>
            </span>
            <input @focus="inputIsSelected = true" @blur="inputIsSelected = false"  :tabindex="parseInt(key_index.split(',')[1])"  v-model="max" :style="{border:'none',outline:'none', color: color.color}" class="fullwidth padleft025 dq-inp-objtfy pad025" type="number" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "_key", "color","appearance", "key_index", "disabled"],
    data:() => ({
        value: {
            min: 0,
            max: 0,
        },
        min: 0,
        max: 0,
        placeholder: 'none',
        inputIsSelected: false
    }),
    watch: {
        inputIsSelected(n) {
            if(this.inputIsSelected) {
                this.$parent.isActive = true
            } else {
                this.$parent.isActive = false
            }
            // console.log(this._key,n)
        },
        min(){
            // handling going under the minimum
            if(this.min == this.data.options.min || this.min < this.data.options.min) {
                this.min = this.data.options.min
            }
            // handling going over the maximum
            if(this.min == this.max || this.min > this.max) {
                this.min = this.max -1
                this.max++
            }
            this.$emit("onChange", {
                err: null,
                data: {
                    min: parseInt(this.min),
                    max: parseInt(this.max)
                },
                key: this._key
            })
        },
        max(){
            // handling going under the minimum
            if(this.max == this.min) {
                this.max = parseInt(this.min) +1
                this.min--
            } else if (this.max < this.data.options.min) {
                this.max = this.data.options.min + 1
            }
            

            // handling going over the maximum
            if(this.max > this.data.options.max || this.max == this.data.options.max) {
                this.max = this.max - 1
            }

            this.$emit("onChange", {
                err: null,
                data: {
                    min: parseInt(this.min),
                    max: parseInt(this.max)
                },
                key: this._key
            })
        }
    },
    mounted() {
        try {
            const { min, max} = this.data.value
            this.min = min
            this.max = max
        }catch(err) {}
    }
}
</script>