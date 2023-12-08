<template>
  <div id="DataPackagePage">
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8" style="display:flex;">
        <el-input placeholder="请输入搜索关键字" v-model="val" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search"  @click="search">
            搜索</el-button>
        </el-input>
        <el-button type="primary" icon="el-icon-plus" style="margin-left:10px" @click="handleAdd">添加</el-button>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="showMeal" style="width: 100%;margin-top: 10px;" border fit fixed height="350">
      <el-table-column label="套餐编号" prop="_id" width="220px"></el-table-column>
      <el-table-column label="名称" prop="name" width="220px"></el-table-column>
      <el-table-column label="时长(单位:月)" prop="mouth"></el-table-column>
      <el-table-column label="价格" prop="normalPrice"></el-table-column>
      <el-table-column label="打折价格" prop="salePrice"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-edit"></i>
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pageData="pageData" :total="total" @getData="getData" @handlePage="handlePage"></Pagination>

    <!-- //弹出框 -->
    <el-dialog :title="dialogType[dialogIndex].title + '套餐'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="dialogData">
        <el-form-item label="套餐编号" label-width="30%" v-show="dialogType[dialogIndex].hide">
          <el-input v-model="dialogData._id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="时长(单位:月)" label-width="30%">
          <el-input v-model="dialogData.mouth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="打折价格" label-width="30%">
          <el-input v-model="dialogData.salePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价" label-width="30%">
          <el-input v-model="dialogData.normalPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="套餐是否推荐" label-width="30%">
          <el-input v-model="dialogData.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称" label-width="30%">
          <el-input v-model="dialogData.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定{{ dialogType[dialogIndex].title }}</el-button>
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
      meal: [],
      dialogFormVisible: false,
      dialogData: {},
      dialogType: [
        { id: 1, title: '新增', hide: false },
        { id: 2, title: '修改', hide: true },
      ],
      dialogIndex: 1,
      pageData: { pageSize: 5, currentPage: 1 },
      total: 0,
      searchMeal:[],
      confirm:false
    }
  },
  computed:{
    showMeal(){
      let size=this.pageData.pageSize;
      let page=this.pageData.currentPage;
      if(this.val!=''&&this.confirm){
        return this.searchMeal.filter((e,i)=>i<size*page&&i>=size*(page-1));
      }
      this.total=this.meal.length;
      return this.meal.filter((e,i)=>i<size*page&&i>=size*(page-1));
    }
  },
  watch:{
    val(){
      this.pageData.currentPage = 1;
      this.confirm=false;
    }
  },
  methods: {
    async getAllMeal() {
      const res = await this.$api.meal.getAllMeal(this.pageData);
      console.log(res);
      if (res.meta.status == 200) {
        this.meal = res.data;
        this.total = res.data.length;
      }

    },
    async updateMeal() {
      const res = await this.$api.meal.updateMeal(this.dialogData);
      console.log(res);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      }else{
        this.$message.error(res.meta.msg);
      }
    },
    async addMeal() {
      const res = await this.$api.meal.addMeal(this.dialogData);
      console.log(res);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      }else{
        this.$message.error(res.meta.msg);
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogIndex = 1;
      this.dialogFormVisible = true;
      this.dialogData = {...row}
    },
    handleAdd() {
      this.dialogData = {type: 1};
      this.dialogIndex = 0;
      this.dialogFormVisible = true;
    },
    submit() {
      if (this.dialogIndex) {
        this.updateMeal();
      } else {
        this.addMeal();
      }
      this.dialogFormVisible = false;
      this.getAllMeal();
    },
    async handleDelete(index, row) {
      console.log(index, row);
      const data = await this.$api.meal.delMeal({ _id: row._id })
      console.log(data);
      if (data.meta.status == 200) {
        this.$message.success(data.meta.msg);
        this.getAllMeal();
      } else {
        this.$message.error(data.meta.msg);
      }
    },
    search(){
      this.confirm=true;
      this.searchMeal=this.meal.filter(e=>JSON.stringify(e).includes(this.val.trim()));
      this.total=this.searchMeal.length;
    },
    getData(){
      this.getAllMeal()
    },
    handlePage(data) {
      this.pageData = data;
    },
  },
  created() {
    this.getAllMeal();
  },
}
</script>

<style>
</style>
