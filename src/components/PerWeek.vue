<!--  -->
<template>
  <div class="perW">
    <el-container
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);"
    >
      <el-header class="tit" height="40px">第{{ week }}周周报</el-header>
      <el-main class="mains">
        <el-card class="box-card" v-show="postListPerWeek.length == 0">
          <div v-show="postListPerWeek.length == 0">此周暂无周报</div>
        </el-card>
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item, index) in postListPerWeek"
            :key="index"
            :name="index"
          >
            <template slot="title">
              {{ item.title}}
              <el-button
                plain
                @click="edit(item.id)"
                icon="el-icon-edit"
                circle
                >编辑</el-button>
            </template>
            <mavon-editor
              v-model="item.content"
              :subfield="false"
              :boxShadow="false"
              defaultOpen="preview"
              :toolbarsFlag="false"
            />
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getPostsByWeek } from "@/api/api";
import { getWeekNumber } from "@/utils/date";
export default {
  name: "PerWeek",
  data() {
    return {
      selectDate: "",
      postListPerWeek: [],
      week: "",
    };
  },
  methods: {
    getSelectDate() {
      var date = this.$route.query.selectDate;
      return date;
    },
    edit(aid) {
      console.log(aid);
      this.$router.push({ path: "/Menu/Wedit", query: { Aid: aid } });
    },
  },
  created() {
    let time = this.getSelectDate();
    this.week = (parseInt(getWeekNumber(time)) - 1).toString();
    console.log(time);
    getPostsByWeek(time).then((r) => {
      this.postListPerWeek = r.data;
    });
  },
  mounted() {
    let time = this.getSelectDate();
    this.week = (parseInt(getWeekNumber(time)) - 1).toString();
    console.log(time);
  },
};
</script>

<style  lang="scss">
.perW {
  margin-top: 10px;
}
.tit {
  font-size: 25px;
  margin-top: 16px;
  margin-bottom: 0px;
}
.mains {
  margin-top: 0px;
  padding-top: 10px;
}
.card {
  margin-top: 0px;
}
.el-collapse-item__header {
  font-size: 20px !important;
  padding-left: 30px;
}
.el-button {
  border: 0px !important;
  padding-top: 20px !important ;
  box-shadow: 0 !important;
}
</style>
