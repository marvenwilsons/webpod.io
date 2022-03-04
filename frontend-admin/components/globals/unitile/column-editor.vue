<template>
    <div class="fullwidth flex" >
        <div 
            :style="{
                display: 'grid',
                'grid-template-columns': `${frs.join(' ')}`,
            }" 
            class="fullwidth" 
        >
            <v-menu 
                offset-y
                v-for="i in maxCol" :key="i" 
                style="z-index:900"
                
            >
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        tile
                        elevation="0"
                        outlined
                    >
                        <div class="flex flexcol flexcenter" >
                            <div>
                                C{{i}}
                            </div>
                            <span class="text-lowercase" ><code>{{ getFrs[i - 1] }}</code></span>
                        </div>
                    </v-btn>
                </template>
                <v-list  >
                    <v-list-item link >
                        <v-list-item-title v-text="'custom'" ></v-list-item-title>
                    </v-list-item>
                    <v-list-item
                    v-for="item in 6"
                    :key="item"
                    link
                    @click="assignSize(item,i - 1)"
                    >
                    <v-list-item-title   v-text="`${item}fr`"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
import m from '@/m'
export default {
    mixins: [m],
    props: ['maxCol', 'gridColumns'],
    data: () => ({
        frs: [],
        ready: true
    }),
    computed: {
        getFrs() {
            return this.frs
        }
    },
    methods: {
        assignSize(size,index) {
            this.$set(this.frs,index,`${size}fr`)
        }
    },
    mounted() {
        this.frs = this.gridColumns
        
        for(let i = 0; i < this.maxCol; i++) {
            if(i > this.frs.length - 1) {
                this.frs.push('1fr')
            }
        }
    }
}
</script>