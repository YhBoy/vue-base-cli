**
 * User: haixu
 * Date: 2020/6/13
 * Time: 9:26
 */

//格式化千分位
export function thousandsFormat(value = 0) {
    if (typeof value === "number") {
        if (value !== 0) {
            // 判断是否有小数位
            if ((value + '').indexOf('.') != -1) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            } else {
                value = value.toLocaleString();
            }
        }
    } else if (typeof value === "string") {
        if (value !== '') {
            value = value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
    } else {
        value = 0;
    }
    return value;
}

//百分号如果显示0，用 - 代替
export function percentage(val) {
    return val || val === 0 ? val + '%' : '-'
}

//格式化1、0及null对应显示内容
export function formatTrueFalseLable(val) {
    return val === null ? '' : val === 1 ? '是' : '否';
}
