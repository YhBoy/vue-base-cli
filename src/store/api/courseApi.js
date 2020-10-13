/**
 * User: haixu
 * Date: 2020/10/8
 * Time: 11:44
 */
import httpRequest from "../../utils/httpRequest";

export function actionGetIndexData(store, params) {
    return httpRequest.get('/v1/index', params)
}

export function actionGetCourseInfo(store, id) {
    return httpRequest.get('/v1/trainCourse/'+id)
}

export function actionGetRecommend(store, params) {
    return httpRequest.get('/v1/train/course/recommend', params)
}

export function actionStudyUpdate(store, params) {
    return httpRequest.post('/v1/user/course/study', params)
}

export function actionCollectCourse(store, courseId) {
    return httpRequest.post('/v1/trainCourse/collect/'+courseId)
}

export function actionGetStudyProgress(store, id) {
    return httpRequest.get('/v1/trainCourse/studyRate/'+id)
}
