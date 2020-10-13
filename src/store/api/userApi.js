/**
 * User: haixu
 * Date: 2020/10/7
 * Time: 16:41
 */
import httpRequest from "../../utils/httpRequest";

export function actionLogin(store, params) {
    return httpRequest.post('/v1/user/login', params)
}

export function actionUserInfo() {
    return httpRequest.get('/v1/member/user/info')
}

