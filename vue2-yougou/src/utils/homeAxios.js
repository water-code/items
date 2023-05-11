import axios from 'axios'

const homeAxios = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1/home'
})

export default homeAxios
