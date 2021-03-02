<template>
  <div class="container">
    <!-- 公益404 -->
    <script v-if="error.statusCode===404" type="text/javascript"
    src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"
    charset="utf-8" homePageUrl="javascript:history.back();" homePageName="点击此处返回"></script>
  </div>
</template>


<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.container {
  background: #f3f3f4;
}
</style>
