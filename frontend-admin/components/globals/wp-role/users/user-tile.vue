<template>
    <div @click="$emit('selectUser',user)" >
        <v-card
        elevation="2" 
        v-ripple 
        class=" pointer margintop050 grey lighten-4 pad050" 
        outlined
        >
            <div class="flex flexcenter flexstart" >
                <!-- <v-icon outlined class="marginright050" >mdi-account</v-icon> -->
                <v-avatar
                    :color="getRandomColor()"
                    size="36"
                >
                    <span class="white--text t text-uppercase">
                        {{user.first_name.charAt(0)}}{{user.last_name.charAt(0)}}
                    </span>
                </v-avatar>
                <span class="marginleft050 " >
                    {{user.first_name}} {{user.last_name}}
                </span>
            </div>
        </v-card>
    </div>
</template>
<script>
export default { 
    props: ['user'],
    methods: {
        getRandomColor() {
            const colors = ['blue','pink','indigo','purple','deep-purple','cyan', 'teal', 'green', 'amber','orange','deep-orange']
            // const i = Math.floor(Math.random() * colors.length - 1) + 1;
            const i = 2
            return `${colors[i]} lighten-1`
        }
    }
}
</script>