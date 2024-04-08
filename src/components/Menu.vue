<!--  -->
<template>
  <div class="menu">

    <router-link class="blog-name" to="/Menu/CurrentWeek" style="text-decoration: none;">Visualize Group </router-link>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
       style=" box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); "
    >

      <el-menu-item index="/Menu/CurrentWeek">本周周报</el-menu-item>

      <el-submenu index="2">
        <template slot="title">各人周报</template>

        <el-menu-item
          v-for="(item, index) in UserList"
          :key="index"
          :name="index"
          @click="test(item.id,item.username)"
          >{{ item.username }}</el-menu-item
        >
      </el-submenu>

      <el-menu-item index="/Menu/Wedit">编写</el-menu-item>

      <el-menu-item index="/Menu/PerWeek" >
        <el-date-picker
          v-model="value"
          type="week"
          format="yyyy 第 WW 周"
          value-format="yyyy-MM-dd"
          placeholder="选择周"
          @change="selectDate(value)"
        >
        </el-date-picker>
      </el-menu-item>
    </el-menu>
    <router-view :key="$route.fullPath" style="box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;"></router-view>
  </div>

</template>

<script>
import { getUsers }  from "@/api/api";
export default {
  data() {
    return {
      activeIndex: "1",
      value: "",
      UserList: [],
    };
  },
  beforeUpdated() {
    var t = this.$route.path;
    var endIndex = t.lastIndexOf("/");
  },
  created() {
    getUsers().then((r) => {
      console.log(r)
      this.UserList = r.data;
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    test(uid,username) {
      this.$router.push({ path: "/Menu/PerPerson", query: { Uid: uid ,Username:username} });
    },
    selectDate(value) {
      this.$router.push({
        path: "/Menu/PerWeek",
        query: { selectDate: value },
      });
    },
  },
};
</script>

<style  scoped>

.router-link-active {
  text-decoration: none;
}
.menu {
  width: 70%;
 -webkit-box-flex:1;
 -moz-box-flex:1;
  text-align: center;
  margin: auto;
  background-color: #ecf0f3;
height: 100%;
}
.el-menu-item .template {
  font-size: 16px;
   background-color: #ecf0f3 !important;
}
.el-menu{
   background-color: #ecf0f3;
   box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
   display: flex;
   overflow: hidden;
}

</style>
