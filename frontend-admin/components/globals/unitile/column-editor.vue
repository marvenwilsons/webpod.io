<template>
    <div class="fullwidth flex" >
        <div 
            :style="{
                display: 'grid',
                'grid-template-columns': `${frs.join(' ')}`,
            }" 
            class="fullwidth" 
        >
            <dropDown
                v-for="i in maxCol"
                :key="uid(i)"
                @command="(item) => {assignSize(item,i - 1)}"
                :options="[
                    {title: 1},
                    {title: 2},
                    {title: 3},
                    {title: 4},
                    {title: 5},
                    {title: 7},
                    {title: 8},
                    {title: 9},
                    {title: 10},
                ]"
            >
                <v-btn tile block >
                    C{{i}} 
                    <div class="marginright025" >
                        <v-divider vertical ></v-divider> 
                        <code class="text-lowercase" >{{frs[i -1]}}</code>
                        <v-divider vertical ></v-divider> 
                    </div>
                </v-btn>
            </dropDown>
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