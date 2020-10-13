/**
 * User: haixu
 * Date: 2020/9/17
 * Time: 16:10
 */
export default {
    auth(state) {
        return state.user.name==='admin'?1:0;
    }
}
