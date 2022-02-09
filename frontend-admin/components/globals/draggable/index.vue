<template>
    <div class="fullwidth flex flexcenter" >
        <div id="mydiv" class="absolute " >
            <div class="absolute flex flexend fullwidth" style="z-index: 1;" id="mydivheader" >
                <v-btn :ripple="false" style="cursor: move;" text plain small tile >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,15V13H5V15H3M3,11V9H5V11H3M7,15V13H9V15H7M7,11V9H9V11H7M11,15V13H13V15H11M11,11V9H13V11H11M15,15V13H17V15H15M15,11V9H17V11H15M19,15V13H21V15H19M19,11V9H21V11H19Z" />
                    </svg>
                </v-btn>
            </div>
            <div style="top: 50%; left: 50%;" >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    }
}
</script>