<!--
 * @Author: Vimalakirti
 * @Date: 2020-07-18 18:06:12
 * @LastEditTime: 2020-07-18 18:12:25
 * @Description: 
 * @FilePath: \tree-ui\README.md
--> 
# tree-ui
基于element-ui二次封装树组件
## 数据
```js
 parent: [{
        name: '文件夹1',
        pid: 0,
        id: 1
      },
      {
        name: '文件夹2',
        pid: 0,
        id: 2
      },
      {
        name: '文件夹1-1',
        pid: 1,
        id: 3
      },
      {
        name: '文件夹2-1',
        pid: 2,
        id: 4
      },
      {
        name: '文件夹3',
        pid: 0,
        id: 5
      },
      {
        name: '文件夹2-2',
        pid: 2,
        id: 6
      },
    ],
    child: [{
        name: '文件夹1',
        pid: 1,
        id: 10001
      },
      {
        name: '文件夹2',
        pid: 1,
        id: 10002
      },
      {
        name: '文件夹2-1',
        pid: 2,
        id: 10003
      },
      {
        name: '文件夹2-2',
        pid: 2,
        id: 10004
      },
      {
        name: '文件夹1-1-1',
        pid: 4,
        id: 10005
      },
      {
        name: '文件夹2-1-1',
        pid: 5,
        id: 10006
      },
    ]
```