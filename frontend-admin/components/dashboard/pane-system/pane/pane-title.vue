<template>
  <main>
    <section class="flex" role="pane title and service selector" >
        <div  role="pane title" class=" relative" >
            <div @click="showServiceDropDown = !showServiceDropDown" class="flex flat_action_plain" >
                <h6 style="margin:0; color: #444; font-weight: 500;" class="merri-font" >{{this.paneCollection[this.paneIndex].paneConfig.title || 'pane'}}</h6>
                <!-- service select -->
                <div v-if="this.paneCollection[this.paneIndex].viewConfig.view_versions && this.paneCollection[this.paneIndex].viewConfig.view_versions.length > 1" >
                  <svg v-if="showServiceDropDown == false" role="service select" style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                  <svg v-if="showServiceDropDown" style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
                  </svg>
                </div>
            </div>
            <v-card  
              color="#e9f3fb" 
              v-if="showServiceDropDown && this.paneCollection[this.paneIndex].viewConfig.view_versions && this.paneCollection[this.paneIndex].viewConfig.view_versions.length > 1" 
              class=" fullwidth paneShadow" style="background: white; position:absolute; z-index:999;" 
            >
              <div @click="toggleService(service)" class="flat_action" v-for="service in this.paneCollection[this.paneIndex].viewConfig.view_versions" :key="uid(service)" >
                {{service}}
              </div>
            </v-card>
        </div>
    </section>
    <!-- desc -->
    <span class="text-small" >
        {{this.paneCollection[this.paneIndex].paneConfig.description || ''}}
    </span>
  </main>
</template>
<script>
import m from '@/m'
export default {
  mixins: [m],
  props: ['paneCollection','paneIndex'],
  data: () => ({
    showServiceDropDown: false,
    s: ['dashboard','tefasdf']
  }),
  methods: {
    toggleService(selected_service) {
      this.showServiceDropDown = false
    }
  }
}
</script>