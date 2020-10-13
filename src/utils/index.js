import store from '@/store'
/**
 * 关闭全局loading
 */
export function closeLoading () {
  store.commit('common/updateLoadingState',false);
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  // Vue.cookie.delete('token');
  localStorage.removeItem('token')
  window.location.reload()
}

/**
 * 序列化对象分解成键值对
 * **/
export function formatObject(data = {}) {
  // data.token = Vue.cookie.get('token');
  data.token = localStorage.getItem('token');
  const keys = Object.keys(data),
      values = Object.values(data);
  let str = "?";
  keys.forEach((e, i) => {
    str += `${e}=${values[i]}&`
  })
  return str
}
