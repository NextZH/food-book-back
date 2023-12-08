<template>
  <div>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8" style="display:flex;">
        <el-input placeholder="请输入搜索关键字" v-model="val" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="getMembers">
            搜索</el-button>
        </el-input>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;" border fit fixed height="350">
      <el-table-column prop="_id" label="用户编号" align="center" min-width="150">
      </el-table-column>
      <el-table-column prop="nickName" label="用户名" align="center" width="150">
      </el-table-column>
      <el-table-column prop="img" label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar shape="circle" size="large" :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="住住址" align="center">
      </el-table-column>
      <el-table-column prop="vip" label="是否会员" align="center">
      </el-table-column>
      <el-table-column prop="vipdate" label="VIP到期时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openPayVip(scope.row._id, scope.row.vipdate)">充值会员
          </el-button>
          <el-button size="mini" type="danger" @click="cancelMemberVip(scope.row._id)"
            :disabled="scope.row.vip | isVip">取消会员
          </el-button>
          <el-button size="mini" type="danger" @click="delMemberVip(scope.row._id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pageData="pageData" :total="total" @getData="getMembers" @handlePage="handlePage"></Pagination>

    <!-- //弹出框 -->
    <el-dialog title="充值会员" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="toPayData">
        <el-form-item label="会员编号" label-width="30%">
          <el-input v-model="toPayData.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="VIP到期时间" label-width="30%">
          <el-input v-model="toPayData.date" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="选择会员截止日期" label-width="30%">
          <el-date-picker type="date" value-format="yyyy/MM/dd" v-model="toPayData.newVipDate">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmPayVip">确定修改</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination';

export default {
  components: {
    Pagination,
  },
  filters: {
    isVip(value) {
      if (value == '是') {
        return false;
      }
      return true
    }
  },
  data() {
    return {
      val: '',
      tableData: [],
      pageData: { pageSize: 5, currentPage: 1 },
      total: 0,
      toPayData: { id: 0, vipdate: '000', newVipDate: '000' },
      //弹框显示
      dialogFormVisible: false,
     
    }
  },
  created() {
    console.log('创建');
    this.getMembers();
  },
  methods: {

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toView(e) {
      console.log(e);
    },
    //获取会员
    async getMembers() {
      const res = await this.$api.member.get({ ...this.pageData, val: this.val });
      console.log(res);
      if (res.meta.status == 200) {
        res.data.forEach(item => item.vip ? item.vip = "是" : item.vip = "否")
        this.tableData = res.data;
        this.total = res.total;
      }
    },
    //充值会员
    async openPayVip(id, date) {
      this.dialogFormVisible = true;
      this.toPayData = { id, date }
    },

    //确认充值
    async confirmPayVip() {
      const { id, newVipDate } = this.toPayData;
      const res = await this.$api.member.toPayVipAsync({ _id: id, date: newVipDate });
      if (res.meta.status == 200) {
        this.getMembers();
        this.dialogFormVisible = false;
        this.$message.success(res.meta.msg);
        return
      }
      this.$message.error(res.meta.msg);
    },

    //取消会员
    async cancelMemberVip(_id) {
      const res = await this.$api.member.cancelMemberVipAsync({ _id });
      if (res.meta.status == 200) {
        this.getMembers();
        this.$message.success('取消会员成功');
        return
      }
      this.$message.error('取消会员失败');
    },

    //删除会员    
    async delMemberVip(_id) {
      const res = await this.$api.member.delMemberVipAsync({ _id });
      if (res.meta.status == 200) {
        this.getMembers();
        this.$message.success('删除会员成功');
        return
      }
      this.$message.error('删除会员失败');
    },
    handlePage(data) {
      this.pageData = data;
    },

  },
  computed: {
    isVip(e) {
      return e
    }
  },
  watch: {
    //监测搜索框的值发生变化将起始页改变为1
    val() {
      this.pageData.currentPage = 1;

    }
  }
}
</script>

<style>
</style>

