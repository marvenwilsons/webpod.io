<template>
    <div class="fullwidth flex flexend" >
        <div>
            <v-btn
                elevation="1"
                outlined
                :disabled="disableGoBtn"
                class=" marginright050 primary--text"
                fab small
                @click="$emit('stop')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <!-- Begin update process -->
            <v-btn
                outlined
                elevation="1"
                :disabled="disableStopBtn"
                :loading="loadingGobtn"
                class=" marginright050 primary--text"
                fab small
                @click="$emit('go')"
            >
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        disableGoBtn: false,
        disableStopBtn: false,
        loadingGobtn: false
    }),
    methods: {
        setLoading(state) {
            this.loadingGobtn = state
        },
        disableALl() {
            this.disableGoBtn = true
            this.disableStopBtn = true
        },
        enableAll() {
            this.disableGoBtn = false
            this.disableStopBtn = false
        },
        disableBtn(btnName) {
            if(btnName == 'go') {
                this.disableGoBtn = true
            } else if(btnName == 'stop') {
                this.disableStopBtn = true
            }
        }
    }
}
</script>