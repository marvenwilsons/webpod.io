<template>
    <div class="fullwidth flex flexcenter " >
        <v-card id="mydiv" class="" elevation="8">
            
            <div id="mydivheader" style="background: whitesmoke;" class=" flex spacebetween flexcenter pad050 padleft125">
                <div class="body-1"  >
                    <strong>
                        {{modalTitle}}
                    </strong>
                </div>
                <div>
                    <v-btn v-if="!isCollapsed"  @click="collapse" :ripple="false" icon text  >
                        <v-icon>mdi-arrow-collapse</v-icon>
                    </v-btn>
                    <v-btn v-if="isCollapsed"  @click="expand" :ripple="false" icon text  >
                        <v-icon>mdi-arrow-expand</v-icon>
                    </v-btn>
                    <v-btn  @click="handleClose" :ripple="false" icon text  >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-progress-linear
                v-if="modalProgress"
                :active="true"
                :indeterminate="true"
                color="primary"
            ></v-progress-linear>
            
            <div id="content"  class="pad125 paneBorder" :style="fullscreen ? fullscreen_modal :  {zIndex:2,}" role="content" >
                <div class="pad125" >
                    <slot></slot>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import m from '@/m'
import gsap from "gsap";
export default {
    mixins: [m],
    props: ['name','modalTitle', 'modalProgress', 'fullscreen'],
    data: () => ({
        currentId: undefined,
        ready: true,
        title: 'Untitled',
        progress: false,
        isCollapsed: false,
        fullscreen_modal: {
            height: undefined,
            width: undefined,
            zIndex: 2
        }
    }),
    methods: {
        handleClose() {
            webpod.dash.modal.hide()
        },
        collapse() {
            this.isCollapsed = true
            gsap.to("#content", {height: 0, duration: 0.3, ease: "power3.inOut"});
            gsap.to("#content", {width: '250px', duration: 0.3, ease: "power3.inOut"});
        },
        expand() {
            this.isCollapsed = false
            gsap.to("#content", {height: 'auto', duration: 0.3, ease: "power3.inOut"});
            gsap.to("#content", {width: 'auto', duration: 0.3, ease: "power3.inOut"});
        }
    },
    mounted() {
        const ww = window.innerWidth
        const wh = window.innerHeight
        this.$set(this.fullscreen_modal,'height',`${wh-50}px`)
        this.$set(this.fullscreen_modal,'width',`${ww}px`)

        window.addEventListener('resize', () => {
            const wh = window.innerHeight
            const ww = window.innerWidth
            this.$set(this.fullscreen_modal,'height',`${wh-50}px`)
            this.$set(this.fullscreen_modal,'width',`${ww}px`)
        })

        dragElement(document.getElementById("mydiv"));

        function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
        }

    },
}
</script>

<style>
#mydiv {
  position: absolute;
  z-index: 9;
  
}

#content {
    resize: both !important;
    overflow: auto;
}

#mydivheader {
  cursor: move;
  z-index: 10 !important;
  /* background-color: #1e1e1e; */
  /* color: #fff; */
}
</style>