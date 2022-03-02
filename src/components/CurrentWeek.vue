<template>
  <div class="currentW">
    <el-container
      style="
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
    >
      <el-header class="tit" height="40px"
        >
        <div>本周周报</div>
       
          <div
            class="expand"
            v-if="activeName.length === 0"
            @click="allExpand"
            >
            <el-link icon="el-icon-arrow-down">展开所有</el-link>
            </div>
          <div
            class="expand"
            v-else
            @click="allShrink"
            ><el-link icon="el-icon-arrow-up">折叠所有</el-link></div>
     
      </el-header>
      <el-main class="mains">
        <el-card class="box-card" v-show="postListPerWeek.length == 0">
          <div v-show="postListPerWeek.length == 0">本周暂无周报</div>
        </el-card>

        <el-collapse class="card" v-model="activeName">
          <el-collapse-item
            v-for="(item, index) in postListPerWeek"
            :key="index"
            :name="index"
            :disabled="postListPerWeek.length == 0"
          >
            <template slot="title">
              <div class="username">{{ item.author.username }}</div>
              <!-- <div class="title-a">{{ item.title }}</div> -->

              <div class="check">
                <el-link icon="el-icon-view">查看 </el-link>
              </div>
              <div class="edit" @click="edit(item.id)">
                <el-link icon="el-icon-edit">编辑</el-link>
              </div>
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
import { getDate } from "@/utils/date";

export default {
  // name: "CurrentWeek",
  data() {
    return {
      activeName: [],
      msg: "Welcome to Your Vue.js App",
      postListPerWeek: [],
    };
  },
  methods: {
    allExpand() {
      this.activeName = [];

      for (let i = 0; i < this.postListPerWeek.length; i++) {
        this.activeName.push(i);
      }
    },
    allShrink() {
      this.activeName = [];
    },
    edit(aid) {
      console.log(aid);
      this.$router.push({ path: "/Menu/Wedit", query: { Aid: aid } });
    },
  },
  created() {
    let time = getDate();
    getPostsByWeek(time).then((r) => {
      console.log(r)
      this.postListPerWeek = r;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.currentW {
  margin-top: 10px;
}
.expand {
  font-size: 15px;
  float: right;
  //margin:5px 0 10px 0;
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
.title-a {
  position: absolute;
  font-size: 15px;
  left: 150px;
  color: #909399;
  font-family: "微软雅黑";
}
.username {
  font-size: 30px;
}
.el-collapse-item__header {
  padding-left: 40px;
  height: 60px !important;
}
.el-collapse-item {
  position: relative;
}
.check {
  position: absolute;
  left: 255px;
}
.edit {
  position: absolute;
  left: 310px;
}
</style>
