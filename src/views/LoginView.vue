<template>
  <div id="login">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="header">
        登录
      </div>
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toHome">登录</el-button>
        <router-link to="/register">没账号？去注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: 'zhangsan',
        password: '123456',
      }
    }
  },
  methods: {
    async toHome() {
      const data = await this.$api.users.login(this.form);
      console.log(data);
      if (data.code==200) {
        this.$message.success(data.msg);
        localStorage.setItem('token',data.token);
        this.$router.push('/home');
      } else {
        this.$message.error(data.msg);
      }
    }
  }
}
</script>

<style scoped lang="scss">
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .header{
    flex-shrink: 0;
    width: 100%;
    margin-bottom: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 260px;
    box-shadow: 0px 0px 5px 1px #ccc;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
