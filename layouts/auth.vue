<template>
  <div class="container">
    <div class="left-top-header">
      <nuxt-link to="/">
        <img :src="settings.blogLogo" alt="logo" />
        <h3>{{settings.blogName}}</h3>
      </nuxt-link>
    </div>
    <div class="auth">
      <nuxt />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  data(){
    return{
      settings:this.$store.state.settings
    }
  }
})
</script>

<style lang="scss" scoped>
.container{
  background: #f3f3f4;
}
.left-top-header{
  position: fixed;
  top:0;
  left:15px;
  img{
    width: 100px;
    /* height: 100px; */
  }
  h3{
    margin-left: 20px;
    display: inline-block;
  }
}
</style>
