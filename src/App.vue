<template>
  <div id="app">
    <img class="avatar" :src="userInfo.avatar" @click="getUserInfo()">
    <router-view/>
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
    // this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      this.userInfo = null;
      // this.axios.get('/user/userinfo')
      // .then(({data})=>{
      //   if(data.error === 0){
      //     this.userInfo = data.data;
      //   }else{
      //     this.userInfo = {};
      //   }   
      // });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.avatar{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
