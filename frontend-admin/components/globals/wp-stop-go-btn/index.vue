<template>
    <div class="fullwidth flex  flexcol" >
        <v-expand-transition>
            <v-card v-if="errorMsg" outlined style="background: #ffebee" class="err_shake fullwidth pad050  marginbottom050 rounded body-1 " > 
                <span class="padleft025 padright025 text-err" >
                    {{errorMsg}}
                </span> 
            </v-card>
        </v-expand-transition>
        <div class="flex flexend" >
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
        loadingGobtn: false,
        errorMsg: undefined
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
        },
        setError(msg) {
            this.loadingGobtn = false
            this.errorMsg = msg
        }
    }
}
</script>