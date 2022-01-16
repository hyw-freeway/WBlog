<template>
  <el-container
    style=" box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); "
  >
    <!-- <div class="switch__circle"></div>
    <div class="switch__circle switch__circle--t"></div> -->
    <div class="app-container">
      <el-form
        :label-position="'left'"
        :model="markdownForm"
        :rules="rules"
        label-width="60px"
      >
        <el-form-item  label="名 字" prop="title">
          <el-input  style=" box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); " v-model="markdownForm.title"></el-input>
        </el-form-item>
      </el-form>
      <mavon-editor
        class="bjq"
        ref="md"
        @save="save"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        v-model="markdownForm.content"
        :codeStyle="markdown.codeStyle"
        :toolbars="markdown.toolbars"
      />
      <br />
      <el-row>
        <el-col :span="2">
          <el-button @click="goback">返 回</el-button>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button type="primary" style="float: right;background-color: #4B70E2" @click="save"
            >保 存</el-button
          >
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>
 
<script>
import {
  getMarkdownArticleByAid,
  saveMarkdownArticle,
  uploadImg,
  getImg
} from "@/api/markdownArticle";
import axios from 'axios'
import { Message } from 'element-ui';


export default {
  data() {
    return {
      markdown: {
        codeStyle: "atom-one-dark",
        markdownOption: {
          bold: true, // 粗体

          defineOpen: "preview",
          // 更多配置
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          //subfield:false,
          preview: true, // 预览
        },
      },
      markdownForm: {
        id: null,
        title: "",
        content: "",
        // publishDate:"",
        // uid:""
        // contentHtml:null,
        //type:0
      },

      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 80, message: "长度在1到80个字符", trigger: "blur" },
        ],
      },
      lastSaveTime: null,
      timer: null,
    };
  },
  created() {
    this.getArticle();
  },
  mounted() {
    this.timer = setInterval(this.intervalSave, 2 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getArticle() {
      //获取文章内容
      let aid = this.$route.query.Aid;
      if (aid == null) {
        this.markdownForm.content = "";
      } else {
        getMarkdownArticleByAid(aid)
          .then((r) => {
            this.markdownForm.content =
              r.data.content == null ? "" : r.data.content;
            this.markdownForm.id = r.data.id;
            this.markdownForm.title = r.data.title;
            // this.markdownForm.type=r.data.type
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    save() {
      //保存文章内容
      if(this.markdownForm.title==""){
        Message("请填写名字")
      }else{
      console.log("保存文章，上传服务器");
      this.markdownForm.id = this.getAid();
      console.log(this.markdownForm);
      saveMarkdownArticle(this.markdownForm)
        .then((r) => {
          this.$message.success("保存成功");
          //this.markdownForm.id=r.data.id
          this.lastSaveTime = new Date();
        })
        .catch((e) => {
          console.log(e);
        });}
    },
    intervalSave() {
      //自动保存
      console.log("时间到了，自动保存");
      /* let now = new Date()
      if(now-this.lastSaveTime>=2*60*1000){
        saveMarkdownArticle(this.markdownForm).then(r => {
          this.$message.success("自动保存成功")
          this.lastSaveTime=new Date()
        }).catch(e => {
          console.log(e)
        })
      }*/
    },
    imgAdd(pos, $file) {
      console.log(pos)
      console.log($file);
      //添加图片，pos为位置
       let $vm=this.$refs.md
      let base64Data=$file.miniurl  //获取图片base64内容
      console.log(typeof(base64Data))
      console.log(base64Data)
      uploadImg(base64Data).then(r => {
        this.$refs.md.$img2Url(pos, '/api/article/image/'+r.data.msg);
      }).catch(e => {
        console.log(e)
      })
    },
    imgDel(pos, url) {
      //删除图片，并不是修改就会触发，仅支持工具栏操作
      console.log(pos);
      console.log(url);
    },
    goback() {
      this.$router.push("/Menu/CurrentWeek");
    },
    getAid() {
      var aid = this.$route.query.Aid;
      return aid;
    },
  },
};
</script>
<style>
.bjq {
  height: 578px;
  width: auto;
}
.app-container {
  padding-top:20px;
  padding-bottom: 8px;
  margin:auto;
  width: 90%;
}
.el-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
/* .switch__circle {

  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
  bottom: -15%;
  left: -20%;
  
 
}
.switch__circle--t {
  top: -1%;
  left: 90%;
  width: 300px;
  height: 300px;
} */
.el-button{
   width: 100px;
  height: 50px;
  border-radius: 25px !important;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9 !important;
  font-weight: 700 !important;
  font-size: 14px !important;
}

</style>
 
