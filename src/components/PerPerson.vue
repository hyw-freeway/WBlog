<!--  -->
<template>
    <div class="currentW">
      <el-container style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-header class="tit" height="40px">{{ uid }}的周报</el-header>
      <el-main class="mains" >
      <el-collapse accordion  class="card">
        <el-collapse-item
          v-for="(item, index) in postListPerPerson"
          :key="index"
          :name="index"
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
import { getPostsByUid } from "@/api/api";
export default {
  name: "PerPerson",
  created() {
    this.uid = this.getUid();
    if (this.uid == null) {
      this.postListPerPerson = [];
    } else {
      getPostsByUid(this.uid)
        .then((r) => {
          this.postListPerPerson = r.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  data() {
    return {
      uid: null,
      postListPerPerson: [],
      person: "",
    };
  },
  methods: {
    getUid() {
      var uid = this.$route.query.Uid;
      return uid;
    },
     edit(aid){
      console.log(aid)
      this.$router.push({ path: "/Menu/Wedit", query: { Aid: aid } })
    },
    getPerList(){
      this.uid = this.getUid();
    if (this.uid == null) {
      this.postListPerPerson = [];
    } else {
      getPostsByUid(this.uid)
        .then((r) => {
          this.postListPerPerson = r.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    }
  },
};
</script>

<style lang="scss">
.currentW{
  margin-top: 10px;
}
.tit{
  font-size: 25px;
  margin-top: 16px;
  margin-bottom: 0px;
}
.mains{
  margin-top:0px;
 padding-top:10px;
}
.card{
  margin-top: 0px;
}

.el-collapse-item__header{
  font-size: 20px !important;
  padding-left: 30px;
}
.el-button{
  border: 0px !important;
  padding-top:20px !important ;
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
