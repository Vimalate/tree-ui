<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:20:09
 * @LastEditTime: 2020-07-18 23:09:59
 * @Description: 
 * @FilePath: \tree-ui\app.vue
--> 
<template>
  <div>
    <my-tree :data="data"></my-tree>
  </div>
</template>

<script>
import { getTreeList } from "./api";
import MyTree from "./mytree";
export default {
  data() {
    return {
      data: []
    };
  },
  components: { MyTree },
  async mounted() {
    let { data } = await getTreeList();
    this.data = [...data.parent, ...data.child];
    data.parent.forEach(e => (e.type = "parent"));
  }
};
</script>

<style lang="scss" scoped>
</style>