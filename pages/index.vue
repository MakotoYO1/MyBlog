<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        myBlog
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async created(){
    let res1=await this.$axios.post('/api/auth/find',{
      name:'admin',
      pwd:'123'
    })
    console.log(res1)
    // console.log(this.$auth.loggedIn)
  }
})
// export default Vue.extend({
//   // async asyncData ({ $axios }) {
//   //   // let res1=await $axios.$get('/api/auth/exist')
//   // },

//   // async mounted(){
//   //   // console.log(this.$axios.get)
//   //   // let res1=await this.$axios.$get('/api/auth/exist')
//   //   // console.log(res1)
//   //   // let res2=await this.$axios.$post('/api/auth/create',{
//   //   //   name:'admin',
//   //   //   pwd:123
//   //   // })
//   //   // console.log(res2)
//   //   // let res2=this.$auth.loginWith('local',{
//   //   //   data:{
//   //   //     name:'admin',
//   //   //     pwd:123
//   //   //   }
//   //   // }).catch(err=>{
//   //   //   console.error(err)
//   //   // })
//   //   // console.log(res2)
//   //   // let res3=await $axios.$post('/api/auth/login',{

//   //   // })
//   //   // let res4=await this.$axios.$post('/api/auth/logout')
//   //   // console.log(res4)
//   //   // let res4=await $axios.$post('/api/auth/logout')
//   //   // console.log(res4)
//   // }
// })
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
