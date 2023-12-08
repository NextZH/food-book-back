<template>
  <div class="box">
    <el-form label-width="95px">
      <div class="div">
        <div class="div-box">
          <el-form-item label="用户名">
            <el-input v-model="add.account"></el-input>
          </el-form-item>
           <el-form-item label="密码">
            <el-input v-model="add.password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="add.realname"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="add.telephone"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="button-div">
        <el-form-item>
          <el-button type="primary" @click="addAdmins">立即创建</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      add: {
        
      },
    };
  },
   computed: {
  
  },
  created() {
  
  },
 
  methods: {
   
    
    //确认新增
    async addAdmins() {
      const res = await this.$api.users.addAdmins(this.add);
      console.log(res);
      if (res.code==200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
     
      }
    },
    //取消
    cancel() {
      this.add = {};
    },
  },
};
</script>

<style scoped >
.box {
  margin: 0;
  padding: 0;
}
.el-breadcrumb {
  margin: 0;
  padding: 0;
  height: 60px;
  width: 95%;
  margin: 0 auto;
  line-height: 60px;
  font-size: 16px;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
.el-form {
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
}
.div {
  display: flex;
  /* background-color: antiquewhite; */
 
 
}
 .div-box{
 margin-left: 15vw;
 }
.el-input,
.el-select {
  width: 300px;
 
 
}
.img-div {
  margin: 0 auto;
  margin-top: 40px;
}
.img-div p {
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  margin: 0 auto;
}
.button-div {
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
}
.el-button {
  width: 100px;
}
</style>