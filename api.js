/*
 * @Author: Vimalakirti
 * @Date: 2020-07-18 17:59:02
 * @LastEditTime: 2020-07-18 22:02:54
 * @Description: 
 * @FilePath: \tree-ui\api.js
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const getTreeList = () => {
  return axios.get('/getTreeList')
}