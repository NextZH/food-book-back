<template>
  <el-container class="homeContainer">
    <TheSideMenu></TheSideMenu>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span><span class="username">欢迎你，普通管理员：{{ realname }}</span>
          <el-button type="primary" size="mini" @click="loginOut">退出</el-button>
        </span>
      </el-header>
      <el-main>
        <TheBreadcrumb></TheBreadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheSideMenu from "@/components/the-side-menu/TheSideMenu.vue";
import TheBreadcrumb from "@/components/the-breadcrumb/TheBreadcrumb.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheSideMenu,
    TheBreadcrumb
  },
  data() {
    return {
      user: "admin",

    };
  },
  computed: {
    ...mapGetters(['realname']),
  },
  methods: {
    loginOut() {
      localStorage.removeItem('token');
      this.$message.success('注销成功');
      this.$router.replace('/login');
      this.$router.go(0);
    }
  }
};
</script>

<style scoped lang="scss">
.homeContainer {
  min-height: 100vh;
  background-color: #eee;
}
.el-header {
  background-color: white;
  color: black;
  text-align: center;
  line-height: 60px;

  .username {
    margin-right: 20px;
    font-weight: bold;
    font-size: 16px;
  }
}

.el-main {
  background-color: #fff;
  color: #333;
  margin: 10px;
}
</style>
