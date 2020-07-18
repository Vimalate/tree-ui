<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:20:09
 * @LastEditTime: 2020-07-18 18:31:04
 * @Description: 
 * @FilePath: \tree-ui\app.vue
--> 
<template>
  <div></div>
</template>

<script>
import { getTreeList } from "./api";
export default {
  async mounted() {
    let { data } = await getTreeList();
  }
};
</script>

<style lang="scss" scoped>
</style>