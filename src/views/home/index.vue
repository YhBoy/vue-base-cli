<!--
 * User: haixu
 * Date: 2020/10/7
 * Time: 15:02
 -->

<template>
    <div class="container">
        <div class="header">
            <img class="icon" src="/img/img/home-logo.png"/>
            <div class="search-wrap" @click.stop="goToUrl('Search')">
                <img src="/img/img/search.png"/>
                <text>搜索课程</text>
            </div>
        </div>
        <div class="swiper-wrap" v-if="banners.length>0">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in banners" :key="index">
                    <div v-if="item.link" @click="switchPage(item)">
                        <img :src="item.imgUrl"/>
                    </div>
                    <img v-if="!item.link" :src="item.imageUrl"/>
                </van-swipe-item>

            </van-swipe>

        </div>
        <!-- 精选 -->
        <div class="module-wrap" v-if="goodCourses.length>0">
            <div class="module-header">
                <div class="module-title">精选课程</div>
                <div class="btn-more" @click.stop="goToUrl('ThemeCourse',{type:1})">查看全部</div>
            </div>
            <div class="module-content-list clearfix">
                <div v-for="(item, index) in goodCourses" :key="index" class="course-item">
                    <router-link :to="{name:'CourseInfo',query:{courseId:item.id}}">
                        <img class="cover-img" :src="item.cover"/>
                        <div class="course-name">{{item.name}}</div>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 最新推荐 -->
        <div class="module-wrap" v-if="newCourses.length>0">
            <div class="module-header">
                <div class="module-title">最新推荐</div>
                <div class="btn-more" @click="goToUrl('ThemeCourse',{type:2})">查看全部</div>
            </div>
            <div class="module-content-list clearfix">
                <div v-for="(item, index) in newCourses" :key="index" class="course-item">
                    <router-link :to="{name:'CourseInfo',query:{courseId:item.id}}">
                        <img class="cover-img" :src="item.cover"/>
                        <div class="course-name">{{item.name}}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                currentBanner: 0,
                newCourses: "",
                goodCourses: ""
            }
        },
        created: function () {
            console.log(1);
            this.getData()
        },
        methods: {
            getData() {
                this.$store.dispatch('actionGetIndexData', {}).then(res => {
                        if (res.code === 200) {
                            this.banners = res.data.banners || [];
                            this.currentBanner = 0;
                            this.newCourses = res.data.newCourses || [];
                            this.goodCourses = res.data.goodCourses || [];
                        }
                    }
                )
            },
            switchPage: function (item) {
                let url = item.link;
                // let type = item.type || 1; //跳转类型，默认打开页面
                this.$router.push({
                    path:url
                });
            },
            goToUrl(routeName,query){
                this.$router.push({
                    name:routeName,
                    query:query
                })
            }
        },
    }
</script>

<style scoped>
    .container {
        background: #fff;
    }

    .container {
        padding-bottom: 24px;
    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        padding-top: 12px;
    }

    .icon {
        width: 190px;
        height: auto;
    }

    .search-wrap {
        width: 490px;
        height: 64px;
        border-radius: 32px;
        background: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-wrap img {
        width: 26px;
        height: auto;
    }

    .search-wrap text {
        font-size: 30px;
        color: #979797;
        margin-left: 20px;
    }

    .swiper-wrap {
        width: 100%;
        padding: 0 24px;
        margin-top: 24px;
    }

    .my-swipe {
        width: 100%;
        height: 300px;
    }

    .my-swipe img {
        width: 100%;
        height: 300px;
    }

    .module-wrap {
        width: 100%;
        padding: 0 24px;
        margin-top: 40px;
    }

    .module-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .module-title {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #071836;
    }

    .btn-more {
        width: 146px;
        height: 48px;
        border-radius: 26px;
        font-size: 26px;
        color: #666;
        text-align: center;
        line-height: 48px;
        border: 1px solid #e4e4e4;
    }

    .module-content-list {
        width: 100%;
    }

    .course-item {
        width: 340px;
        display: inline-block;
        vertical-align: top;
        margin-top: 30px;
    }

    .course-item:nth-child(2n) {
        margin-left: 22px;
    }

    .course-item navigator {
        width: 100%;
    }

    .cover-img {
        width: 100%;
        height: 192px;
        border-radius: 8px;
    }

    .course-name {
        margin-top: 20px;
        width: 100%;
        font-size: 32px;
        color: #303131;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>
