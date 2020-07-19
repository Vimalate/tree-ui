<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 22:26:13
 * @LastEditTime: 2020-07-19 11:02:19
 * @Description: 
 * @FilePath: \tree-ui\mytree.vue
--> 
<template>
  <div>
    <el-tree
      v-model="allData"
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
    delete: Function,
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
    // 重命名
    handleRename(data) {
      this.$confirm(`此操作将永久删除该文件${data.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    removeEle(id) {
      let list = _.cloneDeep(this.data);
      list.filter(item => item.id == id);
      this.$emit("input", list); //同步父组件数据
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    // 删除文件
    handleRemove(data) {
      this.$confirm(`此操作将永久删除该文件${data.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 不能直接删除数据，需要调用用户方法
          // 如用户传递了delete方法，则直接调用
          this.delete
            ? this.delete(data.id).then(() => {
                this.removeEle(data.id);
              })
            : this.removeEle(data.id);
          // 没有则直接删除
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCommand(data, v) {
      console.log(data, v);
      if (v === "rn") {
        this.handleRename(data);
      } else if (v === "rms") {
        this.handleRemove(data);
      }
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

          <el-dropdown
            placement="bottom-start"
            trigger="click"
            on-command={this.handleCommand.bind(this, data)}
          >
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {list.map(item => (
                <el-dropdown-item command={item.text}>
                  {item.value}
                </el-dropdown-item>
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