<template>
  <div class="currentW">
    <el-container
      style="
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      "
    >
      <el-header class="tit" height="40px">本周周报</el-header>
      <el-main class="mains">
        <el-card class="box-card" v-show="postListPerWeek.length == 0">
          <div v-show="postListPerWeek.length == 0">本周暂无周报</div>
        </el-card>

        <el-collapse accordion class="card">
          <el-collapse-item
            v-for="(item, index) in postListPerWeek"
            :key="index"
            :name="index"
            :disabled="postListPerWeek.length == 0"
          >
            <template slot="title">
              {{ item.title }}
              <div class="check">
                <el-link icon="el-icon-view"
                  >查看
                </el-link>
              </div >
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
      msg: "Welcome to Your Vue.js App",
      postListPerWeek: [],
    };
  },
  methods: {
    edit(aid) {
      console.log(aid);
      this.$router.push({ path: "/Menu/Wedit", query: { Aid: aid } });
    },
  },
  created() {
    let time = getDate();
    getPostsByWeek(time).then((r) => {
      this.postListPerWeek = r.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.currentW {
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
  font-size: 30px !important;
  padding-left: 30px;
  height: 60px !important;
}
.el-collapse-item{
  position: relative;
}
.check{
position: absolute;
left: 105px;

}
.edit{
  position: absolute;
  left: 160px;
}

</style>
