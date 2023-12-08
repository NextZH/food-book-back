<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in titles" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
    </div>
</template>

<script>
export default {
    created(){
        console.log(this.$route.meta.title);
    },
    computed: {
        titles() {
            return [
                ...this.$route.meta.title
            ]
        }
    }

}
</script>

<style>
</style>