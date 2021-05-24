<template>
  <Layout>
    <el-card
      shadow="never"
      style="
        margin-bottom: 20px;
        padding: 20px 0px 20px 0px;
        text-align: center;
      "
      v-if="!projects || projects.length == 0"
    >
      <font style="font-size: 30px; color: #dddddd">
        <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "开源项目",
  },
};
</script>
