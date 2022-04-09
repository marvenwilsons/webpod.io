import Vue from 'vue'

Vue.directive('log-inner-text', {
  inserted: el => {
    console.log(el.innerText)
  }
})