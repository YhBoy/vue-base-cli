<template>
    <van-tabbar route v-if="!isFullPage" active-color="#2EAF71" inactive-color="#979797">
        <van-tabbar-item to="/home">
            <span>首页</span>
            <template #icon="props">
                <img :src="props.active ? '/img/icon/index-active.png' :'/img/icon/index.png'"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/course">
            <span>课程</span>
            <template #icon="props">
                <img :src="props.active ? '/img/icon/course-active.png' :'/img/icon/course.png'"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/examinationPaper">
            <span>试卷</span>
            <template #icon="props">
                <img :src="props.active ? '/img/icon/home-active.png' :'/img/icon/home.png'"/>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/mine">
            <span>我的</span>
            <template #icon="props">
                <img :src="props.active ? '/img/icon/mine-active.png' :'/img/icon/mine.png'"/>
            </template>
        </van-tabbar-item>
    </van-tabbar>
    <div class="page" :class="{'page-full':isFullPage}">
        <router-view/>
    </div>

</template>

<script>

    export default {
        name: 'App',
        data() {

            return {
                isFullPage: false,
            }
        },
        created() {
            // console.log(1);
        },
        watch: {
            $route: 'routeHandle'
        },
        methods: {
            routeHandle(route) {
                let excludeHeadRoutes = ['Home', 'Course', 'ExaminationPaper', 'Mine'];
                if (excludeHeadRoutes.indexOf(route.name) != -1) {
                    this.isFullPage = false;
                } else {
                    this.isFullPage = true;
                }
            }
        }
    }
</script>

<style>

    body {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
    }

    .page {
        width: 100%;
        padding-bottom: 100px;
    }

    .page-full {
        padding-bottom: 0;
    }
</style>
