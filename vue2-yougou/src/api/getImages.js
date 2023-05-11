export const getImage = function () {
  const arr = []
  for (let i = 0; i < arguments[0].length; i++) {
    arr.push(arguments[0][i].pics_mid_url)
  }
  return arr
}
