/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
//3-16位任何字符
export function validPassword(str) {
  return /^\w{3,16}$/.test(str)
}
export function validNum(str) {
	var reg=/^\.{1,25}$/
  return reg.test(str)
}
export function validPhone(str) {
  return /^1\d{10}$/.test(str)
}
export function validIdCard(str) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
}
