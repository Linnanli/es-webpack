<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      userInfo:{}
    }
  },
  created(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      // this.userInfo = null;
      this.axios.get('/user/userinfo')
      .then(({data})=>{
        if(data.error === 0){
          this.userInfo = data.data;
        }else{
          this.userInfo = {};
        }   
      });
    }
  }
}
</script>

<style lang="scss">
@import '../src/assets/style/reset.scss';
</style>
