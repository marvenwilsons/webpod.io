<template>
    <div class="flex flexcol" >
        <span class="overline" > CUSTOM CSS CLASSES </span> <br>
        <span class="marginbottom caption marginbottom125" >Css classes to be applied only for this selected tile</span>
        <div>
            <codeEditor
                :readOnly="false"
                :lang="'text'"
                ref="co"
                :code="code"
            ></codeEditor>
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
        isLoading: false
    }),
    methods: {
        apply() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            },500)

            const classesString = this.$refs.co.getCode()
            const classesArray = classesString.split('\n').filter(e => e != "")
            const parent = this.$parent

            if(classesArray.length == 0) {
                parent.tiles[parent.nodeSelectedIndex].customClasses = []
            } else {
                let selectedTileCustomClassArray = parent.tiles[parent.nodeSelectedIndex].customClasses

                if(selectedTileCustomClassArray.length > classesArray.length) {
                    // it means the user deleted some classes
                    parent.tiles[parent.nodeSelectedIndex].customClasses = []
                    setTimeout(() => {
                        classesArray.map(e => {
                            !parent.tiles[parent.nodeSelectedIndex].customClasses.includes(e) &&
                            selectedTileCustomClassArray.push(e)
                        })
                    },0)
                } else {
                    // it means the user added some classes
                    classesArray.map(e => {
                        !selectedTileCustomClassArray.includes(e) &&
                        selectedTileCustomClassArray.push(e)
                    })
                }
            }
        }
    },
    mounted() {
        const parent = this.$parent
        this.code = parent.tiles[parent.nodeSelectedIndex].customClasses.join('\n')
    }
}
</script>