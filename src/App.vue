<template>
  <div id="app">
    <img class="avatar" :src="userInfo.avatar" @click="getUserInfo()">
    <p>{{userInfo.username}}</p>
    <p>{{userInfo.date}}</p>
    <p>{{userInfo.email}}</p>
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
@function rem($px, $base-font-size: 75px) {
    @return ($px / $base-font-size) + rem;
}
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .avatar{
    width: rem(200px);
    height: rem(200px);
    border-radius: 50%;
  }
  p{
    font-size: rem(24px)
  }
}

</style>
