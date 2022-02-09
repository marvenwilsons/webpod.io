<template>
    <div class="fullwidth flex flexcenter" >
        <div  :id="`${currentId}-${name}`" class="absolute draggable" >
            <div class="absolute flex flexend fullwidth" style="z-index: 1;" :id="`${currentId}header`" >
                <v-btn :ripple="false" style="cursor: move;" text plain small tile >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,15V13H5V15H3M3,11V9H5V11H3M7,15V13H9V15H7M7,11V9H9V11H7M11,15V13H13V15H11M11,11V9H13V11H11M15,15V13H17V15H15M15,11V9H17V11H15M19,15V13H21V15H19M19,11V9H21V11H19Z" />
                    </svg>
                </v-btn>
            </div>
            <div  role="content" >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import m from '@/m'
export default {
    mixins: [m],
    props: ['name'],
    data: () => ({
        currentId: undefined,
        ready: false
    }),
    created() {
        this.currentId = this.uid()
        const position = { x: 0, y: 0 }
        this.$interact('.draggable').draggable({
            listeners: {
                move (event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
                },
            }
        })
    },
}
</script>