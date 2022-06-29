<template>
    <v-menu
       :close-on-content-click="false"
       :nudge-width="200"
       v-model="menu"
    >
       <template v-slot:activator="{ on, attrs }" >
           <slot
              name="trigger"
              :attrs="attrs"
              :on="on"
               >
           </slot>
       </template>
       <v-card v-if="menu" class="pad125" >
        <slot :close="close" :menu="menu" name="content" ></slot>
       </v-card>
    </v-menu>
</template>

<script>
export default {
    data: () => ({
        menu: false
    }),
    methods: {
        close() {
            this.menu = false
            console.log('closing')
        }
    }
}
</script>