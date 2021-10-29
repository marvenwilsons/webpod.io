<template>
  <div
      class="pad125"
  >
    <div
      v-for="(item,index) in myData"
      :key="index * 413"
    >
      <!-- {{item.split('--:')}} --h -->
      <!-- heading -->
      <div v-if="item.split('--:')[0] == '--h'" >
        <h1 class="merri-font " style="color: #33383c; font-weight: 400; line-height: 40px;" >{{item.split(':')[1].trim()}}</h1>
      </div>
      <!-- paragraph -->
      <div v-if="item.split('--:')[0] == '--p'" >
        <p style="color: #33383c; font-weight: 300;" v-html="item.split(':')[1]" ></p>
      </div>
      <!-- hr -->
      <div v-if="item.split('--:')[0] == '--hr'" >
        <v-divider></v-divider>
      </div>
      <!-- spacer -->
      <div v-if="item.split('--:')[0] == '--spacer'" :style="{minHeight: item.split(':')[1] }" >
      </div>
      <!-- code -->
      <div v-if="item.split('--:')[0] == '--code'" >
        <codeEditor :code="item.split('--code--:')[1]" />
      </div>
      <!-- list -->
      <div v-if="item.split('--:')[0] == '--li'" >
        <li v-for="list in item.split('--li--:')[1].split(' ').filter(e => e != '')" :key="list" >
          • {{list.replace('-','')}}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['myData','config','hooks'],
  mounted() {

  }
}
</script>