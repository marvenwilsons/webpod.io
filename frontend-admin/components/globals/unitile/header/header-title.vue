<template>
    <main>
        <section class="flex flexcenter fullheight-percent" >
            <!-- HEADER TITLE -->
            <div
            class="padleft050 padright050 flex flexcenter borderRad4"
            style="max-width:95px;"  
            >
                <h6 
                style="margin:0; font-size: 17px; font-weight: 600;"
                class="white--text"
                >
                    UNITILE
                </h6>
            </div>
            <!-- PROJECT TITLE -->
            <div 
            style="flex-basis: content;" 
            class="pointer white--text"
            @click="$emit('renameTitle')"
            >
                <div class="pad025 padleft050 padright050" >
                    <div class="flex flexcenter" >
                        <div class="padright025 grey--text lighten-4--text body-1" >
                            {{project_title}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- HEADER HISTORY INFO -->
            <div class=" padright050 fullheight-percent" style="flex-basis: content;"  >
                <div class="flex flexcenter grey--text lighten-4--text fullheight-percent body-1" >
                    last edited {{history_info}}
                </div>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    props: ['project_title','history_info']
}
</script>