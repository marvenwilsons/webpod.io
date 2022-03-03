<template>
    <div v-show="ready" class="fullwidth flex flexcenter" >
        <v-card id="mydiv" class="">
            <div id="mydivheader" style="border-bottom: 1px solid lightgray;" class="pad025 flex spacebetween flexcenter">
                <div class="padleft050" >
                    <strong>
                        {{title}}
                    </strong>
                </div>
                <div>
                    <v-btn color="white" @click="handleClose" :ripple="false" icon text small >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </div>
            <div id="content" style="z-index:2" role="content" >
                <slot></slot>
            </div>
        </v-card>
    </div>
</template>

<script>
import m from '@/m'
export default {
    mixins: [m],
    props: ['name'],
    data: () => ({
        currentId: undefined,
        ready: false,
        title: undefined,
    }),
    methods: {
        handleClose() {
            webpod.dash.modal.hide()
        }
    },
    mounted() {
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
  background-color: #1e1e1e;
  color: #fff;
}
</style>