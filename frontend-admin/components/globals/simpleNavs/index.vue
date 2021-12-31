<template>
    <div class="relative flex fullwidth " style="overflow-y:auto; overflow-x:hidden;" >
        <div class="fullwidth flex flexcol flexwrap" >
            <div class="flex marginbottom125" v-for="(nav, index) in navs" :key="index" >
                <!-- <div class="merri-font   padtop125" >
                    {{nav.name}}
                    <v-divider></v-divider>
                </div> -->
                <div class=" flex flexwrap  fullwidth" style="gap: 15px;"  >
                    <item
                    ref="toolTipItem"
                    v-for="(item,n) in nav.items"
                    :class="['borderRad4 flexwrap', ...item.class]"
                    :key="n"
                    :itemName="item.name"
                    :itemIcon="item.itemIcon"
                    :additionalContent="item.additionalContent"
                    :itemEvents="item.events"
                    :warning="item.warning"
                    :removeWarningOn="removeWarningOn"
                    :disabled="disabled"
                    :style="item.style || {}"
                    @itemClick="bubbleEvent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../../utils'
import item from './item'
export default {
    props: ['myData','myConfig', 'paneIndex', 'hooks'],
    data: () => ({
        navs: [],
        removeWarningOn: undefined,
        disabled: false,
        clickedNav: undefined,
        clickedOn: undefined
    }),
    methods: {
        killToolTip() {
            this.$refs.toolTipItem.map(e => {
                e.kill()
            })
        },
        bubbleEvent(e) {
            this.clickedNav = e.context
            this.clickedOn = e.context.clickedOn
            this.hooks.onNavClick(this)
            this.$emit('onEvent',{
                methods: {
                    loading: this.loading,
                    removeWarning: this.removeWarning
                },
                ...e
            })
            this.killToolTip()
        },
        loading(itemName) {
            this.$refs.toolTipItem.map(e => {
                e.setLoading(itemName)
            })
            this.killToolTip()
        },
        removeWarning(nav) {
            for(let i = 0; i < this.navs.length;i++) {
                for(let j = 0; j < this.navs[i].items.length; j++) {
                    if(this.navs[i].items[j].name == nav) {
                        this.navs[i].items[j].warning = null
                        this.killToolTip()
                        break
                    }
                }
            }
        },
    },
    watch: {
        myData() {
            this.navs = utils.copy(this.myData)
        }
    },
    mounted() {
        // console.log('simpleNavs loaded', this.myData)
        this.navs = utils.copy(this.myData)
    },
    components: {
        item
    }
}
</script>