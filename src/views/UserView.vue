<template>
  <div>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8" style="display: flex">
        <el-input
          placeholder="请输入搜索关键字"
          v-model="val"
          class="input-with-select"
        >
          <el-button
            slot="append"
            type="primary"
            icon="el-icon-search"
            @click="search"
          >
            搜索</el-button
          >
        </el-input>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 10px"
          @click="skip"
          >添加</el-button
        >
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="adMini" style="width: 100%" border class="table">
      <el-table-column label="编号" prop="_id" width="220px"></el-table-column>
      <el-table-column
        label="用户名"
        prop="account"
        width="220px"
      ></el-table-column>
      <el-table-column label="真实姓名" prop="realname" width="200px">
      </el-table-column>
      <el-table-column label="联系方式" prop="telephone"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            class="button"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Pagination :pageData="pageData" :total="total" @getData="getData" @handlePage="handlePage"></Pagination> -->
  </div>
</template>

<script>
import Pagination from "@/components/pagination/Pagination";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      val: "",
      pageData: { pageSize: 5, currentPage: 1 },
      total: 0,
      // carousel: [],
      adMini: [],
    };
  },
  methods: {
    // 获取管理员
    async getAllAdmins() {
      const res = await this.$api.users.getAllAdmins();
      if (res.code == 200) {
        this.adMini = res.message;
      }
      // console.log(res);
      // this.carousel = res.message
    },
    //搜索

    async search() {
      const res = await this.$api.users.getAllAdmins();
      // console.log(this.val)

      if (res.code == 200) {

        let data = res.message.filter((num) => {
          if (num.realname == 张) {
            return num;
          }
           
        });
       console.log(data)
      }
       
      // this.carousel = res.message
    },
    // 删除管理员
    async handleDelete(row) {
      console.log(row);
      const res = await this.$api.users.delAdmins({ _id: row._id });
      console.log(res);
      if (res.code == 200) {
        this.getAllAdmins();
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
    },

    // handlePage(data) {
    //   this.pageData = data;
    // },
    skip() {
      this.$router.push("AddMin");
    },
  },
  created() {
    this.getAllAdmins();
  },
};
</script>

<style lang="scss">
.table {
  margin-top: 10px;
}
.button {
  margin: 0 auto;
}
</style>