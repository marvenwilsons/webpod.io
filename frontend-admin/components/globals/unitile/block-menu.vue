<template>
    <v-menu bottom offset-x :nudge-width="40" :close-on-content-click="false">
        <!-- block display -->
        <template v-slot:activator="{ on, attrs }" >
            <div @click="menu = block.id" v-bind="attrs" v-on="on" class="flex flexcenter" >
                <v-icon v-if="block.component_name == 'text'" >
                    mdi-format-text
                </v-icon>
                <v-icon v-if="block.component_name == 'image'" >
                    mdi-image
                </v-icon>
                <v-icon v-if="block.component_name == 'video'" >
                    mdi-video
                </v-icon>
                <v-icon v-if="block.component_name == 'app-instance'" >
                    mdi-application-brackets-outline
                </v-icon>
                <v-icon v-if="block.component_name == 'website'" >
                    mdi-web
                </v-icon>
                <v-icon v-if="block.component_name == 'youtube'" >
                    mdi-youtube
                </v-icon>
                <v-icon v-if="block.component_name == 'instagram'" >
                    mdi-instagram
                </v-icon>
            </div>
        </template>
        <!-- menu content -->
        <v-card class="pad125" :elavation="5" outlined >
            <div class="flex spacebetween flexcenter">
                <div class="body-1">{{block.component_name}}-block</div>
                <div class="" >
                    <v-btn  icon text>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </div>
            <!-- id -->
            <div class="body-1 flex flexcenter" >
                <span class="marginright050" >block-id:</span> <input v-model="block.id" class="flex1 pad025 paneBorder" type="text">
            </div>
            <!-- native block properties -->
            <!-- inline style -->
            <!-- classes -->
        </v-card>
    </v-menu>
</template>

<script>
export default {
    props: ['block']
}
</script>