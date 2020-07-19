<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:20:09
 * @LastEditTime: 2020-07-19 12:08:32
 * @Description: 
 * @FilePath: \tree-ui\app.vue
--> 
<template>
  <div>
    <my-tree
      v-bind:data.sync="data"
      :fileDrop="fileDrop"
      :dectoryDrops="dectoryDrops"
      :delete="deleteFn"
      v-if="data.length"
    ></my-tree>
  </div>
</template>

<script>
/* eslint-disable */
import { getTreeList } from "./api";
import MyTree from "./mytree";
export default {
  data() {
    return {
      data: [],
      fileDrop: [
        { text: "rn", value: "重命名" },
        { text: "rms", value: "删除文件" }
      ],
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
        }, 1200);
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