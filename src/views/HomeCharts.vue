<template>
  <div class="div">
    <el-card id="main-t" class="box-card2"> </el-card>
    <el-card id="main-s" class="box-card2"> </el-card>
    <!-- <el-card id="main" class="box-card"> </el-card> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
var myCharts;
var myChartt;
export default {
  data() {
    return {
      collect: [],
      pageview: [],
      // genders: [
      //   { man: 0, name: "男性" },
      //   { girl: 0, name: "女性" },
      // ],
    };
  },
  mounted() {
    var chartDoms = document.getElementById("main-t");
    var chartDomt = document.getElementById("main-s");
    myChartt = echarts.init(chartDomt);
    myCharts = echarts.init(chartDoms);
  },
  created() {
    // this.addAdmins();
    this.add();
  },
  computed: {
    gender() {
      return {
        title: {
          text: "会员性别统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.genders,
            // data: [
            //   { value: this.genders.man, name: "男性" },
            //   { value: this.genders.girl, name: "女性" },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    options() {
      return {
        title: {
          text: "食谱收藏排行榜",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: this.collect.map((item) => item.name),
        },
        series: [
          {
            name: "收藏次数",
            type: "bar",
            data: this.collect.map((item) => item.collections),
          },
        ],
      };
    },
    pageviews() {
      return {
        title: {
          text: "食谱浏览排行榜",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: this.pageview.map((item) => item.name),
        },
        series: [
          {
            name: "菜谱浏览人数",
            type: "bar",
            data: this.pageview.map((item) => item.pageview),
          },
        ],
      };
    },
  },
  watch: {
    collect() {
      // console.log(111)
      this.options && myCharts.setOption(this.options);
    },
    genders() {
      // this.gender && myChart.setOption(this.gender);
    },
    pageview() {
      this.pageviews && myChartt.setOption(this.pageviews);
    },
  },
  methods: {
    //获取所有会员
    // async addAdmins() {
    //   var n = 0;
    //   var nv = 0;
    //   const res = await this.$api.member.get();
    //   if (res.meta.status == 200) {
    //     res.data.map(function (i) {
    //       if (i.gender == 1) {
    //         nv++;
    //       } else {
    //         n++;
    //       }
    //     });
    //     this.genders.girl = nv;
    //     this.genders.man = n;
    //     //  console.log( this.genders)
    //     // console.log(nv)
    //   }
    // },
    //获取所有菜品
    async add() {
      const res = await this.$api.menu.get();
      if (res.meta.status == 200) {
        const ress = await this.$api.menu.get({
          pageSize: res.total * res.pages,
        });
        // 菜品收藏排序
        if ((ress.meta.status = 200)) {
          this.collect = ress.menus.sort(function (a, b) {
            return b.collections - a.collections;
          });
          //菜品浏览人数
          this.pageview = ress.menus.sort(function (a, b) {
            return b.pageview - a.pageview;
          });
          // console.log(this.pageview);
          // this.pageview = this.pageview.slice(0, 10);
        }
      }
    },
    //会员点赞菜谱前10
    //会员收藏菜谱前10
  },
};
</script>

<style scoped>
.div {
  width: 90%;
  height: 78vh;
  margin: 0 auto;
  /* background-color: rgb(214, 213, 211); */
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  height: 50vh;
}
.box-card2 {
  width: 48%;
  height: 100%;
  display: inline-block;
  margin: 0 auto;
  /* margin: 0 auto; */
}
</style>
