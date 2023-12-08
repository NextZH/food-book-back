<template>
  <div>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8" style="display:flex;">
        <el-input placeholder="请输入搜索关键字" v-model="val" class="input-with-select">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="search">
            搜索</el-button>
        </el-input>
        <el-button type="primary" icon="el-icon-plus" style="margin-left:10px" @click="handleAdd">添加</el-button>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="showCarousel" style="width: 100%;margin-top: 10px;" border fit fixed height="350">
      <el-table-column label="编号" prop="_id" width="220px"></el-table-column>
      <el-table-column label="商品id" prop="goods_id" width="220px"></el-table-column>
      <el-table-column label="图片" width="200px">
        <template slot-scope="scope">
          <el-image :src="scope.row.image_src">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="导航地址" prop="navigator_url"></el-table-column>
      <el-table-column label="打开方式" prop="open_type"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pageData="pageData" :total="total" @getData="getData" @handlePage="handlePage"></Pagination>

    <!-- //弹出框 -->
    <el-dialog :title="dialogType[dialogIndex].title + '轮播图'" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="dialogData">
        <el-form-item label="轮播图编号" label-width="30%" v-show="dialogType[dialogIndex].hide">
          <el-input v-model="dialogData._id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" label-width="30%">
          <el-input v-model="dialogData.goods_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片路径" label-width="30%">
          <el-input v-model="dialogData.image_src" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航地址" label-width="30%">
          <el-input v-model="dialogData.navigator_url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="打开方式" label-width="30%">
          <el-input v-model="dialogData.open_type" autocomplete="off"></el-input>
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
      carousel: [],
      dialogFormVisible: false,
      dialogData: {},
      dialogType: [
        { id: 1, title: '新增', hide: false },
        { id: 2, title: '修改', hide: true },
      ],
      dialogIndex: 1,
      pageData: { pageSize: 5, currentPage: 1 },
      total: 0,
      searchCarousel:[],
      confirm:false
    }
  },
  computed:{
    showCarousel(){
      let size=this.pageData.pageSize;
      let page=this.pageData.currentPage;
      if(this.val!=''&&this.confirm){
        return this.searchCarousel.filter((e,i)=>i<size*page&&i>=size*(page-1));
      }
      this.total=this.carousel.length;
      return this.carousel.filter((e,i)=>i<size*page&&i>=size*(page-1));
    }
  },
  watch:{
    val(){
      this.pageData.currentPage = 1;
      this.confirm=false;
    }
  },
  methods: {
    async getAllSwiper() {
      const res = await this.$api.carousel.getAllSwiper(this.pageData);
      console.log(res);
      if (res.meta.status == 200) {
        this.carousel = res.message;
        this.total = res.message.length;
      }
    },
    async updateSwiper() {
      let {_id,goods_id,image_src,navigator_url,open_type}=this.dialogData;
      const res = await this.$api.carousel.updateSwiper({_id,goods_id,image_src,navigator_url,open_type});
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.msg);
      }else{
        this.$message.error(res.msg);
      }
    },
    async addSwiper() {
      let {goods_id,image_src,navigator_url,open_type}=this.dialogData;
      const res = await this.$api.carousel.addSwiper({goods_id,image_src,navigator_url,open_type});
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.message);
      }else{
        this.$message.error(res.message);
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogIndex = 1;
      this.dialogFormVisible = true;
      this.dialogData = {...row}
    },
    handleAdd() {
      this.dialogData = {goods_id: "601fa488882000007800671a",navigator_url: "/pages/goods_detail/index?goods_id=129",open_type: "navigate"};
      this.dialogIndex = 0;
      this.dialogFormVisible = true;
    },
    submit() {
      if (this.dialogIndex) {
        this.updateSwiper();
      } else {
        this.addSwiper();
      }
      this.dialogFormVisible = false;
      this.getAllSwiper();
    },
    async handleDelete(index, row) {
      // console.log(index, row);
      const data = await this.$api.carousel.deleteSwiper({ _id: row._id })
      // console.log(data);
      if (data.code == 200) {
        this.$message.success(data.message);
        this.getAllSwiper();
      } else if(data.code == 405){
        this.$message.error(data.error);
      }else {
        this.$message.error(data.message);
      }
    },
    search(){
      this.confirm=true;
      this.searchCarousel=this.carousel.filter(e=>JSON.stringify(e).includes(this.val.trim()));
      this.total=this.searchCarousel.length;
    },
    getData(){
      this.getAllSwiper()
    },
    handlePage(data) {
      this.pageData = data;
    },
  },
  created() {
    this.getAllSwiper();
  },
}
</script>

<style>
</style>