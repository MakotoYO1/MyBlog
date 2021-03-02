<template>
  <div>
    123admin
    <nuxt-link to='/admin/abc'>ssss</nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  // 配置auth监听是否有token,没有则跳转到auth登录页面
  // 这里是部分配置auth的实现
  middleware:'auth',
  methods:{

  }
}
</script>

<style>

</style>
