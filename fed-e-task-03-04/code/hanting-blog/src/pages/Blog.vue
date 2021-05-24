<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          style="margin-left: 10px"
          icon="el-icon-share"
          type="warning"
          plain
          circle
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          round
          plain
          style="float: right"
          @click="goAdd"
          >写博文</el-button
        >
      </el-card>

      <div v-if="$page.blogs && $page.blogs.edges.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in $page.blogs.edges"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <template v-if="!item.node.hide">
            <div slot="header">
              <el-row>
                <el-col :span="16">
                  <span>
                    <a
                      style="text-decoration: none; cursor: pointer"
                      @click="goDetails(item.node.id)"
                    >
                      <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                      {{ item.node.title }}
                    </a>
                  </span>
                </el-col>
                <el-col :span="8">
                  <div style="text-align: right">
                    <el-button
                      style="padding: 3px 0"
                      type="text"
                      icon="el-icon-share"
                    ></el-button>
                    <el-button
                      style="padding: 3px 0"
                      type="text"
                      icon="el-icon-edit"
                      v-if="token"
                    ></el-button>
                    <el-button
                      style="padding: 3px 0"
                      type="text"
                      icon="el-icon-delete"
                      v-if="token"
                    ></el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
              最近更新 {{ item.node.updated_at }}
            </div>
            <div
              style="
                font-size: 1.1rem;
                line-height: 1.5;
                color: #303133;
                padding: 10px 0px 0px 0px;
              "
            >
              {{
                item.node.content.length > 10
                  ? item.node.content.substring(0, 9) + "..."
                  : item.node.content
              }}
            </div>
          </template>
        </el-card>
        <pager :info="$page.blogs.pageInfo" />
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!$page.blogs || $page.blogs.edges.length === 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query($page:Int){
  blogs:allStrapiPost(perPage:10,page:$page)@paginate{
    pageInfo{
      totalPages
      currentPage
    }
    edges{
      node{
        id
        title
        content
        users_permissions_user{
          id
          username
        }
        updated_at
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      loading: false,
      searchKey: "",
      token: "",
    };
  },
  methods: {
    search() {
      for (let i = 0; i < this.$page.blogs.edges.length; i++) {
        this.$page.blogs.edges[i].node.hide =
          this.$page.blogs.edges[i].node.title.indexOf(this.searchKey) < 0;
      }
    },
    goAdd() {
      if (!this.token) {
        this.$message({
          message: "请绑定有效的Token",
          type: "warning",
        });
        return;
      }
      this.$router.push("/");
    },
    goDetails(id) {
      this.$router.push("/detail/" + id);
    },
  },
};
</script>
<style lang='scss' scoped>
</style>