export const getNames = function() {
  const arr = []
  for (let i = 0; i < arguments[0].length; i++) {
    arr.push(arguments[0][i].goods_id)
  }
  return arr
}
