<template>

  <div>
    <meta name="referrer" content="never" />
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8" style="display:flex;">
        <el-input placeholder="请输入搜索菜谱名称" v-model="val" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="searchMenu">
            搜索</el-button>
        </el-input>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;" border fit fixed height="350">
      <el-table-column prop="_id" label="菜谱编号" align="center" width="230">
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center" width="150">
      </el-table-column>
      <el-table-column prop="img" label="缩略图" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" size="large" :src="scope.row.coverpic"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="pageview" label="浏览量" align="center">
      </el-table-column>
      <el-table-column prop="collections" label="收藏量" align="center">
      </el-table-column>
      <el-table-column prop="isFree" label="是否免费" align="center">
      </el-table-column>
      <el-table-column prop="isHot" label="是否热点" align="center">
      </el-table-column>
      <el-table-column prop="needtime" label="制作时间" align="center">
      </el-table-column>
      <el-table-column label="原料" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewIngredient(scope.row.ingredient, scope.row.name)" type="text"
            size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="制作步骤" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewStep(scope.row.method)" type="text" size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="openViewUpdateDialog(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pageData="pageData" :total="total" @getData="getData" @handlePage="handlePage"></Pagination>

    <!-- 原料查看弹出框 -->
    <el-dialog :title="ingredientMenuName" :visible.sync="dialogIngredient" width="350px">
      <el-table :data="IngredientData" border height="300" stripe>
        <el-table-column property="name" label="用料" width="150" align="center"></el-table-column>
        <el-table-column property="number" label="数量" width="150" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 步骤查看弹出框 -->
    <el-dialog title="步骤" :visible.sync="dialogStep" width="500px" top="30px">
      <div class="box-card" style="overflow-y: scroll; height: 500px;padding: 0 65px">
        <div v-for="(o, index) in stepData" :key="index">
          <h3>步骤{{ index + 1 }}</h3>
          <p>{{ o.describe }}</p>
          <div style="text-algin:center;padding:10px">
            <img :src="o.img" alt="" style="width:300px;height:300px" />
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog title="修改菜谱" :visible.sync="dialogUpdate">
      <el-form :model="updateData">
        <el-form-item label="名称" label-width="30%">
          <el-input v-model="updateData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否免费" label-width="30%">
          <el-select v-model="updateData.isFree">
            <el-option value="是">
            </el-option>
            <el-option value="否">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热点" label-width="30%">
          <el-select v-model="updateData.isHot">
            <el-option value="是">
            </el-option>
            <el-option value="否">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制作时间" label-width="30%">
          <el-input v-model="updateData.needtime" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdate = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确定修改</el-button>
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
  data() {
    return {
      val: '',
      tableData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      pageData: { pageSize: 5, currentPage: 1 },
      total: 0,
      IngredientData: [],
      ingredientMenuName: '原料',
      dialogIngredient: false,
      stepData: [],
      dialogStep: false,
      dialogUpdate: false,
      updateData: {}
    }
  },
  created() {
    console.log('创建');
    this.getMenus();
  },
  methods: {

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    switchYN(v) {
      if (v == '是') {
        return 'Y'
      }
      return 'N'
    },
    //获取菜谱
    async getMenus() {
      const res = await this.$api.menu.get(this.pageData);
      // console.log(res);
      if (res.meta.status == 200) {
        res.menus.forEach(item => {
          if (item.isFree == 'Y') {
            item.isFree = '是'
          } else if (item.isFree == 'N') {
            item.isFree = '否'
          }
          if (item.isHot == 'Y') {
            item.isHot = '是'
          } else if (item.isHot == 'N') {
            item.isHot = '否'
          }
        })
        this.tableData = res.menus;
        this.total = res.total;
      }
    },
    //搜索菜谱
    async searchMenu() {
      const res = await this.$api.menu.search({ ...this.pageData, val: this.val });
      console.log(res);
      if (res.meta.status == 200) {
        res.menus.forEach(item => {
          if (item.isFree == 'Y') {
            item.isFree = '是'
          } else if (item.isFree == 'N') {
            item.isFree = '否'
          }
          if (item.isHot == 'Y') {
            item.isHot = '是'
          } else if (item.isHot == 'N') {
            item.isHot = '否'
          }
        })
        this.tableData = res.menus;
        this.total = res.total;
      }
    },
    //查看原料
    viewIngredient(data, name) {
      this.dialogIngredient = true;
      this.IngredientData = data
      this.ingredientMenuName = name

    },
    //修改菜谱
    openViewUpdateDialog(data) {
      this.dialogUpdate = true;
      this.updateData = data
    },

    //确认修改
    async confirmUpdate() {

      this.updateData.isFree = this.switchYN(this.updateData.isFree)
      this.updateData.isHot = this.switchYN(this.updateData.isHot)
      const res = await this.$api.menu.update(this.updateData);
      if (res.meta.status == 200) {
        this.$message.success('修改成功')
        this.dialogUpdate = false;
        this.getMenus()

        return
      }
      this.$message.error('修改失败')

    },
    //查看步骤
    viewStep(data) {
      this.dialogStep = true;
      this.stepData = data
    },
    getData() {
      if (this.val.trim()) {
        this.searchMenu()
        return
      }
      this.getMenus()
    },
    handlePage(data) {
      this.pageData = data;
    },
  },
  watch: {
    val() {
      this.pageData.currentPage = 1;

    },

  }
}
</script>

<style>
</style>
