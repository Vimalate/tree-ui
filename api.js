/*
 * @Author: Vimalakirti
 * @Date: 2020-07-18 17:59:02
 * @LastEditTime: 2020-07-18 18:18:31
 * @Description: 
 * @FilePath: \tree-ui\api.js
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const getTreList = () => {
  return axios.get('/getTreeList')
}