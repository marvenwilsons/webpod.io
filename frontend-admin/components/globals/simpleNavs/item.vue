<template>
    <div class="relative" >
        <loader v-if="loading == itemName" />
        <div   style="background:white;" transition="" class="item relative borderRad4" effect="light"   placement="right-start">
                <!-- opener -->
                <!-- <el-button :autofocus="warning ? true : false" class="fullwidth" >
 
                    <div class="flex spacebetween flexcenter relative" >
                        <div class="flex" >
                            <div style="width:20px;" class="flex flexcenter" >
                                <i class="el-icon-files"></i>

                            </div>
                            <div class="marginleft050 fullheight-percent fullwidth flex" >
                                {{itemName}}
                            </div>
                        </div>
                        <i style="color:#e6a23c" v-if="warning" class="el-icon-info"></i>
                        
                        <div style="z-index:100" v-if="loading == itemName" >
                            <Loading />
                        </div>
                    </div>
                </el-button> -->
                <!-- expanded content -->
                <div v-if="true" style="z-index:100;" class="" slot="content" >
                    <div style="align-items: flex-end;" class="flex padleft125 padright125 padtop125" >
                        <div class="flex flexcenter fullheigt-percent">
                            <!--  -->
                            <div class="fullheight-percent fullwidth flex flexcenter flexstart" >
                                <div class="marginright050" >
                                    <i class="el-icon-files"></i>
                                </div>
                                <h6 style="color:#333; margin:0; font-weight:300" >
                                    <div class="merri-font" >
                                        {{itemName}}
                                    </div>
                                </h6>
                            </div>
                        </div>
                    </div>
                  <section class=" padright125 padbottom125" >
                      <div style="align-items: flex-start" class="margintop125 flex flexwrap padleft125 padright125" >
                        <!-- Available actions -->
                        <small>
                            <button 
                                @click="eventClick(e)" 
                                v-for="(e, itemEventsIndex) in itemEvents" 
                                :key="itemEventsIndex" 
                                class="ibtn dq-button pad050 merri-font" 
                                size="medium" >
                                {{e}}
                            </button>
                        </small>
                    </div>
                    <v-divider v-if="additionalContent" style="margin-bottom:0;" class="marginleft125 marginright125" ></v-divider>
                    <div class="padtop125 relative" style="max-height:460px; overflow-y: auto;" >
                        <div class=" fullwidth fullheight-percent">
                            <div v-for="(content, index) in additionalContent" :key="index" >
                                <itemAdditionaContent
                                    :warning="warning" 
                                    :type="content.type"
                                    :title="content.title"
                                    :body="content.body"
                                    @onEvent="additionalContentEventClick"
                                    @onServiceClick="additionalContentEventClick"
                                />
                            </div>
                        </div>
                    </div>
                  </section>
                </div>
        </div>
    </div>
</template>

<script>
import itemAdditionaContent from './itemAdditionalContent'
import loader from './loader'
export default {
    props: ["itemName", "itemIcon", "itemDescription", "additionalContent", "itemEvents", "warning"],
    components: {
        itemAdditionaContent,
        loader
    },
    data: () => ({
        toolTipState: false,
        loading: undefined
    }),
    computed: {
        getToolTipState() {
            return this.toolTipState
        }
    },
    methods: {
        setToolTipState(v) {
            this.toolTipState = v
            
        },
        setLoading(itemName) {
            this.loading = itemName
        },
        kill() {
            this.setToolTipState(false)
        },
        eventClick(e) {
            this.$emit('itemClick',{
                eventName: 'navClick',
                context: {
                    itemName: this.itemName,
                    itemIcon: this.itemIcon,
                    itemDescription: this.itemDescription,
                    additionalContent: this.additionalContent,
                    itemEvents: this.itemEvents,
                    clickedOn: e
                }
            })
        },
        additionalContentEventClick(e) {
            this.$emit('onEvent', e)
        }
    }
}
</script>

<style>
.ibtn{
    /* margin-right: 0px !important; */
    margin-left: 0px !important;
}
.ibtn:hover{
    text-decoration: underline;
    background: rgba(211, 211, 211, 0.267);
    outline: none;
}
.el-tooltip__popper, .popper__arrow {
  border: 1px solid rgba(0, 0, 0, 0.548) !important;
  box-shadow: 0px 0px 67px -18px rgba(0, 0, 0, 0.548) ;
  padding: 0 !important;
}
</style>