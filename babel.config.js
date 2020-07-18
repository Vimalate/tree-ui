/*
 * @Author: Vimalakirti
 * @Date: 2020-07-18 21:22:38
 * @LastEditTime: 2020-07-18 21:24:08
 * @Description: 
 * @FilePath: \tree-ui\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}