<template>
    <div style="min-width:350px; height: 300px;"   >
        <!-- eye | order of layer / name of layer | lock -->
        <section class="flex flexend" >
            <v-btn  @click="$emit('addNewLayer')" icon tile >
                <v-icon  class="pointer" >mdi-plus</v-icon>
            </v-btn>
        </section>
        <section style="background: #f5f5f5" class="paneBorder pad050 marginbottom125" >
            <div v-for="(layer) in layers" :key="layer.layer_id" >
                <!-- {{layer.layer_order}} -->
                <!-- {{layer.layer_blocks}} -->
                <!-- {{layer.layer_name}} -->
                <!-- {{layer.layer_lock}} -->
                <!-- {{layer.layer_show}} -->
                <v-card outlined hover class="pad025 rounded-0 margintop025 pointer flex flexcol" >
                    <div class="flex pad025 flexcenter" >
                        <div class="flex1 fullheight-percent" >
                            <!-- <span v-if="!renaming" :class="['body-1 marginleft025']" >
                                {{layer.layer_name}}
                            </span> -->
                            <div class=" padright050" >
                                <!-- <v-divider style="margin: 0;" ></v-divider> -->
                                <input v-model="layer.layer_name" class="paneBorder fullwidth pad025 body-1"  type="text" >
                            </div>
                            <v-expand-transition>
                                <div class="deep-orange--text accent-3"  v-if="layer.layer_name.trim() === ''" >
                                    Layer name cannot be undefined
                                </div>
                            </v-expand-transition>
                        </div>
                        <div>
                            <v-btn icon v-if="layer.layer_show == true" >
                                <v-icon @click="layer.layer_show = false" > mdi-eye-outline</v-icon>
                            </v-btn>
                            <v-btn icon v-if="layer.layer_show == false" >
                                <v-icon @click="layer.layer_show = true" > mdi-eye-off-outline</v-icon>
                            </v-btn>
                            <v-btn icon >
                                <v-icon @click="$emit('deleteLayer',layer.layer_id)" >mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    
                </v-card>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: ['layers'],
    data: () => ({
        renaming: false,
        renameValue: undefined
    })
}
</script>