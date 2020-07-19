<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:20:09
 * @LastEditTime: 2020-07-19 10:48:53
 * @Description: 
 * @FilePath: \tree-ui\app.vue
--> 
<template>
  <div>
    <my-tree :data="data" :fileDrop="fileDrop" :dectoryDrops="dectoryDrops" :delete="deleteFn"></my-tree>
  </div>
</template>

<script>
import { getTreeList } from "./api";
import MyTree from "./mytree";
export default {
  data() {
    return {
      data: [],
      fileDrop: [{ text: "rm", value: "删除文件夹" }],
      dectoryDrops: [
        { text: "rn", value: "重命名" },
        { text: "rms", value: "删除文件夹" }
      ]
    };
  },
  methods: {
    deleteFn(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    }
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