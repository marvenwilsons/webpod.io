<template>
    <main class="flex flexcol fullheight-percent rounded-xl " style="overflow:hidden;" >
        <section class="padtop125 padleft050 padbottom125" >

            <h5 class="padleft025 " :style="{color: $vuetify.theme.themes.light.primary, margin:'0'}" >
                <span style="font-style: italic;" class="merri-font" >
                    Web<span class="merri-font" style="font-weight:100;" >Pod.io</span>
                </span>
            </h5>
        </section>
        <section :style="{borderBottom: '1px solid none'}" class="" >
            <div 
                :style="{
                    background: selected == item ? '#282a36' : '', 
                    borderTop: '1px solid none'
                }"
                class="fullwidth pad025" 
                v-for="(item,index) in items" :key="index * 43" 
                @click="selected = item"
                >
                <div :style="{color: $vuetify.theme.themes.light.primary}"  
                class="pointer fullwidth pad050 flex flexcenter flexstart" >
                    <!-- <i class="el-icon-box padleft025 padright025"></i> -->
                    <v-icon v-if="selected != item" :style="{color: $vuetify.theme.themes.light.primary}" >
                        mdi-package-variant-closed
                    </v-icon>
                    <v-icon v-if="selected == item" :style="{color: $vuetify.theme.themes.light.primary}" >
                        mdi-package-variant
                    </v-icon>
                    <span class="body-1 marginleft025" :style="{fontWeight: '400'}" >
                        {{item}}
                    </span>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
export default {
    data: () => ({
        items: [],
        selected: undefined,
        onSelected: undefined,
        menu: []
    }),
    watch: {
        selected() {
            let menu = undefined

            for(let i = 0; i < this.menu.length; i++) {
                if(this.menu[i].menu_name == this.selected) {
                    menu = this.menu[i]
                    break
                }
            }

            this.onSelect({selected: this.selected, menu})
        }
    },
    methods: {
        setSelected(itemName) {
            if(this.items.includes(itemName)) {
                this.selected = itemName
            } else {
                alert(`Error cannot set sidebar selected item '${this.selected}'`)
            }
        },
        addItem(item) {
            if(!this.items.includes(item.menu_name)) {
                this.items.push(item.menu_name)
                this.menu.push(item)
            }
        },
        getMenu() {
            return this.menu
        },
        setItems(items) {
            this.items = items.map(item => {
                if(item) {
                    console.log(item.menu_name)
                }
            })
            this.menu = items
        },
    }
}
</script>
