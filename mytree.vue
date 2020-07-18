<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 22:26:13
 * @LastEditTime: 2020-07-18 23:55:01
 * @Description: 
 * @FilePath: \tree-ui\mytree.vue
--> 
<template>
  <div>
    <el-tree
      :data="allData"
      v-if="allData.length"
      default-expand-all
      :render-content="render"
      :expand-on-click-node="false"
    ></el-tree>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    data: {
      type: Array,
      // 默认值数组
      default: () => []
    },
    dectoryDrops: Array,
    fileDrop: Array
  },
  data() {
    return {
      allData: []
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    // 监听父组件数据是否有更新
    data() {
      // 监听更新重新渲染
      this.getData();
    }
  },
  methods: {
    isParent(data) {
      return data.type === "parent";
    },
    render(h, { node, data, store }) {
      console.log(node, store);
      // 是文件还是文件夹，显示不同的操作
      let list = this.isParent(data) ? this.dectoryDrops : this.fileDrop;
      return (
        <div style={{ width: "100%" }}>
          {this.isParent(data) ? (
            node.expanded ? (
              <i class="el-icon-folder-opened"></i>
            ) : (
              <i class="el-icon-folder"></i>
            )
          ) : (
            <i class="el-icon-document"></i>
          )}

          {/**/}
          {data.name}

          <el-dropdown placement="bottom-start" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {list.map(item => (
                <el-dropdown-item>{item.value}</el-dropdown-item>
              ))}
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      );
    },
    getData() {
      // 父组件数据不能直接改变，进行拷贝一份数据再操作
      let AllData = _.cloneDeep(this.data);
      let treeMapList = AllData.reduce((obj, current) => {
        current.label = current.name;
        obj[current["id"]] = current;
        return obj;
      }, {});
      let result = AllData.reduce((arr, current) => {
        let pid = current.pid;
        // 有父id
        let parent = treeMapList[pid];
        if (parent) {
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current]);
        } else if (pid === 0) {
          //根结点
          arr.push(current);
        }
        return arr;
      }, []);
      this.allData = result;
      console.log(result);
    }
  }
};
</script>

<style lang="css" >
.el-tree {
  width: 50%;
}
.el-dropdown {
  float: right;
}
</style>