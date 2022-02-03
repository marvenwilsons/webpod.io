<template>
  <div>
    <div>
      HELLO
    </div>
    <div>
      api_url: <code>{{api_url}}</code>
    </div>
    <div>
      <img :src="`${api_url}/images/sample.png`" alt="">
      <img :src="`${api_url}/images/smile.png`" alt="">
      <video controls :src="`${api_url}/videos/sample.mp4`"></video>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    api_url: ''
  }),
  mounted() {
    console.log('ap',process.env.api_url)
    this.api_url = process.env.api_url
  }
}
</script>