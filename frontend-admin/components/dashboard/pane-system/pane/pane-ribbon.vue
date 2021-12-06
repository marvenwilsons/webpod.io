<template>
  <main class=" flexstart" >
    <div class="flex" >
      <span class="flex relative marginright050 flat_action" v-for="(ribbon, key) in ribbons" :key="uid(key)" >
        <el-dropdown trigger="click" @command="ribbonItemClick" >
          <span class="el-dropdown-link">
            {{key}}
            <i  v-if="ribbon.length > 1"  class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <main>
            <el-dropdown-menu   slot="dropdown">
              <el-dropdown-item :command="ribbon_item" v-for="ribbon_item in ribbon" :key="uid(ribbon_item)" >
                {{ribbon_item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </main>
        </el-dropdown>
      </span>
    </div>
  </main>
</template>
<script>
import m from '@/m'
export default {
  mixins: [m],
  props: ['ribbons','onRibbonClick'],
  methods: {
    ribbonItemClick(e) {
       this.onRibbonClick(e)
    }
  }
}
</script>