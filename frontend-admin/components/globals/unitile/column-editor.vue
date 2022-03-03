<template>
    <div class="fullwidth flex flexcol" >
        <div >
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
                            <span class="text-lowercase" ><code>{{ getFrs[i] }}</code></span>
                        </div>
                    </v-btn>
                </template>
                <v-list  >
                    <v-list-item
                    v-for="item in 6"
                    :key="item"
                    link
                    @click="assignSize(item,i)"
                    >
                    <v-list-item-title   v-text="item"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
    props: ['maxCol'],
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
            this.$set(this.frs,index,`${size}FR`)
        }
    },
    mounted() {
        for(let i = 0; i < this.maxCol + 1; i++) {
            this.frs.push('1fr')
        }

        console.log(this.frs)
    }
}
</script>