<template>
    <main class="flex flexcol fullheight-percent" >
        <section class="padtop125 padleft050 padbottom125" >

            <h5 class="padleft025 " :style="{color: $vuetify.theme.themes.light.primary, margin:'0'}" >
                <span style="font-style: italic;" class="merri-font" >
                    Web<span class="merri-font" style="font-weight:100;" >Pod.io</span>
                </span>
            </h5>
        </section>
        <section :style="{borderBottom: '1px solid #171a1b'}" class="" >
            <div 
                :style="{
                    background: selected == item ? '#303340' : '', 
                    transition: '0.2s',
                    borderTop: '1px solid #171a1b'
                }"
                class="fullwidth pad025" 
                v-for="(item,index) in items" :key="index * 43" 
                @click="selected = item"
                >
                <div :style="{color: $vuetify.theme.themes.light.primary}"  
                class="pointer fullwidth pad050" >
                    <!-- <v-icon :color="$vuetify.theme.themes.light.primary">
                        mdi-arrow-right-circle
                    </v-icon> -->
                    <i class="el-icon-box padleft025 padright025"></i>
                    <span :style="{fontWeight: '400'}" >
                        {{item}}
                    </span>
                </div>
            </div>
        </section>
        <section class="pad125" >
            <Navigator />
        </section>
    </main>
</template>
<script>
import Navigator from './navigator'
export default {
    components: {Navigator},
    data: () => ({
        items: [
            'Dashboard',
            'Collections',
            'Site',
            'Apps',
            'Services',
            'Settings',
            'Files',
            'Maker',
            'empty',
            'uniview',
            'Todo List'
        ],
        selected: undefined,
        onSelected: undefined
    }),
    watch: {
        selected() {
            this.onSelect(this.selected)
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
        addItem(itemName) {
            if(!this.items.includes(itemName)) {
                this.items.push(itemName)
            }
        }
    }
}
</script>
