<template>
  <div>
    abc
    <button @click="logout">登出</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  async created() {
    let res4 = await this.$axios.$get("/api/auth/user");
    console.log(1, res4);
  },
  methods: {
    logout() {
      // 登出后移除token信息
      this.$auth.logout();
    }
  }
});
</script>

<style></style>
