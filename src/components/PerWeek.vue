<!--  -->
<template>
  <div class="perW"
      v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <el-container
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);"
    >
      <el-header class="tit" height="40px">
        <div>第{{ week }}周周报</div>
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
          <div v-show="postListPerWeek.length == 0">此周暂无周报</div>
        </el-card>
        <el-collapse  v-model="activeName">
          <el-collapse-item
            v-for="(item, index) in postListPerWeek"
            :key="index"
            :name="index"
          >
            <template slot="title">
              {{ item.title}}
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
              :externalLink="externalLink"
              :codeStyle="codeStyle"
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
      loading:true,
      activeName:[],
      selectDate: "",
      postListPerWeek: [],
      week: "",
      codeStyle:"",
       externalLink: {
            markdown_css: function() {
                // 这是你的markdown css文件路径
                return '/mavon-editor/markdown/github-markdown.min.css';
            },
            hljs_js: function() {
                // 这是你的hljs文件路径
                return '/mavon-editor/highlightjs/highlight.min.js';
            },
            hljs_css: function(css) {
                // 这是你的代码高亮配色文件路径
                return '/mavon-editor/highlightjs/styles/' + css + '.min.css';
            },
            hljs_lang: function(lang) {
                // 这是你的代码高亮语言解析路径
                return '/mavon-editor/highlightjs/languages/' + lang + '.min.js';
            },
            katex_css: function() {
                // 这是你的katex配色方案路径路径
                return '/mavon-editor/katex/katex.min.css';
            },
            katex_js: function() {
                // 这是你的katex.js路径
                return '/mavon-editor/katex/katex.min.js';
            },
        }
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
     allExpand() {
      this.activeName = [];

      for (let i = 0; i < this.postListPerWeek.length; i++) {
        this.activeName.push(i);
      }
    },
    allShrink() {
      this.activeName = [];
    },
  },
  created() {
    let time = this.getSelectDate();
     if(time){
    this.week = (parseInt(getWeekNumber(time)) - 1).toString();
    console.log(time);
    getPostsByWeek(time).then((r) => {
      console.log(r)
      this.postListPerWeek = r.data;
      this.loading=false
    });
     }else{
       console.log("未选择时间")
     }
  },
  mounted() {
     let that = this;
        that.codeStyle = "atom-one-dark";
    let time = this.getSelectDate();
    if(time){
    this.week = (parseInt(getWeekNumber(time)) - 1).toString();
    console.log(time);
    }else{
      console.log("未选择时间")
    }
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
.expand {
  font-size: 15px;
  float: right;
  //margin:5px 0 10px 0;
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
