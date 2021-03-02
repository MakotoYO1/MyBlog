<template>
  <div class="auth-wrapper">
    <h3 class="auth-title">登 录</h3>
    <div class="auth-input">
      <a-input placeholder="请输入账号" size="large" class="input" v-model="info.name" />
      <a-input-password placeholder="请输入密码" v-model="info.pwd" size="large" class="input" @keyup.enter="login"/>
    </div>
    <a-button @click="login" class="auth-button" type="primary" size="large">登录</a-button>
  </div>
</template>

<script lang="ts">
import { info } from 'console'
import Vue from 'vue'

export default Vue.extend({
  layout:'auth',
  data(){
    return {
      info:{
        name:'',
        pwd:''
      }
    }

  },
  methods:{
    async login(){
      // 登录同时把token注入
    let res2=await this.$auth.loginWith('local',{
      data:{
        name:this.info.name,
        pwd:this.info.pwd
      }
    }).catch(err=>{
      console.error(err)
      this.$message.error('账号或密码不正确！')
    })
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-wrapper {
  max-width: 400px;
  margin: -10vh auto 0;
  padding: 50px 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba($color: #000000, $alpha: .1);
}
.auth-title {
  margin: 0 auto 20px;
  width: 100px;
  color: #1890ff;
  font-size: 30px;
  border-bottom: solid 2px rgba(24, 144, 255,.8);
}
.auth-input {
  margin: 0 20px 20px;
  .input:not(:last-child){
    margin-bottom:20px
  }
  /deep/ .ant-input-affix-wrapper .ant-input{
  text-align: left;
}
}
.auth-button {
  width: 80%;
}

</style>
