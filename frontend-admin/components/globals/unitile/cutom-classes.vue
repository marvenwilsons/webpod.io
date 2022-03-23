<template>
    <div class="flex flexcol" >
        <span class="marginbottom caption marginbottom125" >Separate each classes by New Line or by pressing the Enter Key</span>
        <div>
            <textarea 
                style="height:200px;background: lightgray;" 
                spellcheck="false" 
                class="paneBorder fullwidth pad025" 
                v-model="code"
            />
        </div>
        <div class="flex flexend margintop025" >
            <v-btn :loading="isLoading" plain tile @click="apply" class="caption pad025 paneBorder flat_action" >
                APPLY
                <template v-slot:loader>
                    <span>saving ...</span>
                </template>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        code: '',
        isLoading: false,
        onData: () => {}
    }),
    methods: {
        apply() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            },500)

            const classesString = this.code
            const classesArray = classesString.split('\n').filter(e => e != "")

            if(classesArray.length != 0) {
                this.onData(classesArray)
            }
        },
        setClasses(arr) {
            this.code = arr.join('\n')
        }
    }
}
</script>