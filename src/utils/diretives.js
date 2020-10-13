import Vue from "vue";

// 防抖动函数
function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}

const loadMore = Vue.directive("loadMore", {
  bind(el, binding) {
    // 监听下拉加载更多
    const loadWrap = el.querySelector(".el-table__body-wrapper");
    loadWrap.addEventListener(
        "scroll",
        debounce(() => {
          let sign = 100;
          const sh = loadWrap.scrollHeight,
              st = loadWrap.scrollTop,
              ch = loadWrap.clientHeight
          const scrollDistance = sh - st - ch;
          if (sh != ch && scrollDistance <= sign) {
            binding.value();
          }
        }, 500)
    );
  },
  // unbind() {
  //   const loadWrap = el.querySelector(".el-table__body-wrapper");
  //   loadWrap.removeEventListener(
  //     "scroll",
  //     loadfn(this, binding)
  //   );
  // }
})


export default {
  loadMore
}