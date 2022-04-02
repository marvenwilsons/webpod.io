<template>
    <div @click.stop="$emit('blockClick')" class="block-item"  >
        <!-- <v-slide-x-reverse-transition>
            <div 
            style="right:0;z-index:9999" 
            class="flex flexcenter spacebetween pad025 tile-btn absolute" 
            >
                <dropDown
                    :options="root_block_options"
                    @command="(cmd) => {}"
                >
                    <v-btn  small text icon tile >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                </dropDown>
            </div>
        </v-slide-x-reverse-transition> -->
        <div :class="['flex','flexwrap']" >
            <h1 class="block-item" contenteditable="true" >Lorem impsum</h1>
        </div>
    </div>
</template>
<script>
export default {
    props: ['style_type'],
    data: () => ({
        root_block_options: [
            {title: 'Insert text block', d: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z'},
            {title: 'Insert image block', d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'},
            {title: 'Insert video block', d: 'M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z'},
            {title: 'Insert app instance block', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
            {title: 'Background Image', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
            {title: 'Block Custom CSS', d: 'M21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V4C23 2.9 22.1 2 21 2M21 20H3V6H21V20Z'},
        ]
    })
}
</script>

