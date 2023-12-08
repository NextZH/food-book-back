<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageData.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageData.pageSize'
            layout="total, sizes, prev, pager, next, jumper" :total="total" :pager-count="5">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        pageData: {
            type: Object,
            default: () => ({ pageSize: 5, currentPage: 1 }),
            required: true,  // 父组件必须传
        },
        total: {
            type: [Number, String],
            default: 0
        }
    },
    methods: {

        //分页事件
        handleSizeChange(val) {
            this.$emit('handlePage',{
                ...this.pageData,
                pageSize:val
            })
        },
        handleCurrentChange(val) {
             this.$emit('handlePage',{
                ...this.pageData,
                currentPage:val
            })
        },
    },
    watch: {
        pageData: {
            handler() {
                this.$emit('getData');
            },
            deep: true
        },
    }
}
</script>

<style>
</style>