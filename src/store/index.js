/**
 * User: haixu
 * Date: 2020/10/7
 * Time: 14:50
 */
import { createStore } from 'vuex'
import  state from "./state";
import getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import * as userApi from './api/userApi'
import * as courseApi from './api/courseApi'
import * as examApi from './api/courseApi'
const store = createStore({
    state:()=>(state),
    getters,
    mutations,
    actions: {
        ...actions,
        ...userApi,
        ...courseApi,
        ...examApi,
    },
    strict: process.env.NODE_ENV !== 'production'
})

export default store;
