import axios from 'axios'

const searchAxios = axios.create({
  baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1/goods'
})
export default searchAxios
