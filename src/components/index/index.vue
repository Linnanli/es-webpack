<template>
  <section class="index-page">
      <header class="header">
          <div class="icon">
              <span class="icon-img"></span>
              <strong class="icon-text">{{title}}{{test.a}}</strong>
          </div>
          <div class="login">
              <span class="login-left">登录</span>
              <span class="login-right">注册</span>
          </div>
      </header>
  </section>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
        title:'考拉记账',
        test:{
          a:'1'
        }
    }
  },
  created(){
    setTimeout(() => {
      this.test = null;
    }, 200);
  }
};
</script>
<style lang="scss" scoped>
.index-page {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: rem(100px);
  background-color: #5591ff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.icon {
    margin-left: rem(30px);
    font-size: 0;
    height: rem(50px);
    line-height: rem(50px);
}
.icon-img{
  width: rem(50px);
  height: rem(50px);
  display: inline-block;
  @include bg-img("../../assets/img/logo.png");
  vertical-align: top;
}
.icon-text{
    color: #fff;
    font-size: rem(30px);
    font-weight: normal;
    margin-left: rem(20px);
}
.login {
  text-align: right;
  height: rem(100px);
  line-height: rem(100px);
  font-size: 0;
  color: #fff;
  margin-right: rem(15px);
}
.login-left,
.login-right {
  font-size: rem(28px);
  vertical-align: middle;
  padding: rem(10px);
}
</style>
