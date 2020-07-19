<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 22:26:13
 * @LastEditTime: 2020-07-19 12:11:27
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
/* eslint-disable */
import _ from "lodash";
export default {
  props: {
    delete: Function,
    data: {
      type: Array, // 默认值数组
      default: () => []
    },
    dectoryDrops: Array,
    fileDrop: Array
  },
  data() {
    return {
      allData: [],
      currentId: "", //默认当前点击对象id
      currentContent: ""
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
    // input 变可控组件，可编辑
    handleInput(v) {
      this.currentContent = v;
    },
    // 重命名
    ok(data) {
      let list = _.cloneDeep(this.data);
      let item = list.find(l => l.id == data.id);
      item.name = this.currentContent;
      this.currentId = "";
      // .sync 用法同步数据
      this.$emit("update:data", list); //同步父组件数据
      console.log(list);
      this.$message({
        type: "success",
        message: "修改成功!"
      });
    },
    cancel() {
      this.currentId = "";
    },
    handleRename(data) {
      this.currentId = data.id;
      this.currentContent = data.name;
    },
    removeEle(id) {
      let list = _.cloneDeep(this.data);
      list = list.filter(item => item.id !== id);
      // .sync 用法同步数据
      this.$emit("update:data", list); //同步父组件数据
      console.log(list);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    // 删除文件
    handleRemove(data) {
      this.$confirm(`此操作将永久删除${data.name}, 是否继续?`, "提示", {
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
      // console.log(node, store);
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
          {data.id === this.currentId ? (
            <el-input
              value={this.currentContent}
              on-input={this.handleInput}
            ></el-input>
          ) : (
            data.name
          )}

          {data.id !== this.currentId ? (
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
          ) : (
            <span>
              <el-button type="text" on-click={this.ok.bind(this, data)}>
                确认
              </el-button>
              <el-button type="text" on-click={this.cancel.bind(this, data)}>
                取消
              </el-button>
            </span>
          )}
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
  margin-top: 20px;
}
.el-dropdown {
  float: right;
}
.el-tree .el-tree-node__content {
  height: 32px;
}
.el-tree .el-input {
  width: 50%;
  height: 30px;
}
.el-tree .el-input__inner {
  height: 30px;
}
</style>