<template>
    <div>
        <!-- <span class="overline" >GRID GAP</span> -->
        <!-- <br>
        <span class="marginbottom125 caption" >
            Apply GAP to be applied in all tiles
        </span>
        <br><br> -->
        <!-- gap -->
        <div  >
            <div style="max-width:90px;" class="flex flexcol flexcenter" >
                <div class=" flex" >
                    <div @click="minus" style="min-height:9px;" class=" flex flexcenter" >
                        <v-btn x-small icon >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </div>
                    <div class="paneBorder padleft025 text-small borderRad4" style="width:40px; max-height:18px" >
                        {{value}}px
                    </div>
                    <div @click="add" style="min-height:9px;" class=" flex flexcenter" >
                        <v-btn x-small icon >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- <div class="marginleft025" >
                    <span>
                        gap
                    </span>
                </div> -->
            </div>
        </div>
        
        <!-- align-items: start | end | center | stretch -->
    </div>
</template>

<script>
export default {
    data: () => ({
        value: 0
    }),
    props: ['gap'],
    watch: {
        gap() {
            this.value = this.gap
        }
    },  
    methods: {
        add() {
            this.value ++
            this.$emit('change',this.value)
        },
        minus() {
            if(this.value != 0 || this.value < 0) {
                this.value --
                this.$emit('change',this.value)
            }
        }
    },
    mounted() {
        if(this.gap) {
            this.value = this.gap
        }
    }
}
</script>