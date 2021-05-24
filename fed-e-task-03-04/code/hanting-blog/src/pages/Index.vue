<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="$page.post.id">
        <div slot="header">
          <span>{{ $page.post.title }}</span>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ $page.post.created_at }} <br />
          更新 {{ $page.post.updated_at }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ $page.post.description }}</pre>
        </div>
        <div
          v-html="$page.post.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!$page.post.id"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query{
    post:strapiPost(id:1){
      id,
      title,
      content,
      created_at,
      updated_at
    }
}
</page-query>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
