<template>
    <main class="" style="text-wrapping: wrap; overflow: auto;" >
        <div>
            <v-btn tile icon >
                <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn tile icon >
                <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn tile icon >
                <v-icon>mdi-format-underline</v-icon>
            </v-btn>
            <dropDown
                :options="heading_options"
            >
                <v-btn tile icon>
                    <v-icon>mdi-format-header-pound</v-icon>
                </v-btn>
            </dropDown>
            
        </div>
        <div class="fullwidth overflow-auto padright050" style="height: 200px;" >
            <div :class="[...block.classes]" @input="v => {block.value = v.target.innerHTML}"  
                contenteditable
                class=" fullwidth"
                v-html="text"
                style="text-wrapping: wrap;"
            />
        </div>
    </main>

</template>

<script>
export default {
    props: ['value','block'],
    data: () => ({
        text: undefined,
        heading_options: [
            {title: 'h1'},
            {title: 'h2'},
            {title: 'h3'},
            {title: 'h4'},
            {title: 'h5'},
            {title: 'h6'},
        ]
    }),
    mounted() {
        this.text = this.block.value
    }
}
</script>