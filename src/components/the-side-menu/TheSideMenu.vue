<template>
  <div>
    <el-aside id="myAside" width="180px" style="background-color: #001629">
      <el-menu :default-active="$route.id" class="el-menu-vertical-demo"
        :router="true" :unique-opened="true" background-color="#001629" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item :index="item.path" v-for="item in menus" :key="item.id">
          <i :class="item.img"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          id: '1', title: '首页', path: '/home',img:'el-icon-s-home'
        },
        {
          id: '2', title: '用户管理', path: '/user',img:'el-icon-user-solid'
        },
        {
          id: '3', title: '轮播图管理', path: '/carousel',img:'el-icon-picture'
        },
        {
          id: '4', title: '菜谱管理', path: '/menu',img:'el-icon-menu'
        },
        {
          id: '5', title: '会员管理', path: '/member',img:'el-icon-s-custom'
        },
        {
          id: '6', title: '套餐管理', path: '/dataPackage',img:'el-icon-document-add'
        },
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
#myAside {
  color: white;
  line-height: 200px;
  min-height: 100vh;
  height: 100%;
  overflow-y: hidden;

  .el-col-12 {
    width: 100%;
  }

  [class*=el-col-] {
    float: none;
    box-sizing: border-box;
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-item {
    min-width: 180px;

    &:hover {
      background-color: #1891ff !important;
    }
  }
}
</style>