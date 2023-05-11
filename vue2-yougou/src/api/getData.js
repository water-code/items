import homeAxios from '@/utils/homeAxios.js'
import goodsAxios from '@/utils/goodsAxios'
import { Toast } from 'vant'

// homeAxios
export const getData = async function () {
  const { data: res } = await homeAxios.get(arguments[0])

  if (res.meta.status === 200) {
    return res.message
  } else {
    Toast('请求失败')
  }
}

// goodsAxios
export const getDataWithParams = async function () {
  const { data: res } = await goodsAxios.get(arguments[0], arguments[1])
  if (res.meta.status === 200) {
    // Toast('请求成功')
    return res.message
  } else {
    Toast('请求失败')
  }
}
