<!--
 * User: haixu
 * Date: 2020/10/12
 * Time: 13:47
 -->

<template>
    <div>
        <div class="container" v-if="courseInfo.id">
            <div class="video-wrap" v-if="currentSection.type==1">
                <video id="my-video" :src="currentSection.courseWare" :poster="courseInfo.cover" controls="true" @play="studyUpdate"></video>
            </div>
            <div class="video-wrap" v-if="currentSection.type==2">
                <img class="course-img" :src="courseInfo.cover"/>
                <a :href="currentSection.courseWare" target="_blank" @click="openFile">
                    <div class="mask">
                        <div>
                            <div class="btn-download">开始观看</div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="course-wrap">
                <div class="course-name-box">
                    <div class="course-name">{{courseInfo.name}}</div>
                    <!--                    <div class="share">-->
                    <!--                        <button type="primary" open-type="share" data-name="pageShare" class="btn-hidden"></button>-->
                    <!--                        <img src="/img/img/share.png"/>-->
                    <!--                        <div class="btn-share">分享</div>-->
                    <!--                    </div>-->
                </div>
                <div class="learn-progress">
                    <text>学习进度 {{courseInfo.studyRareStr}}</text>
                    <div class="progress-bg">
                        <div class="progress-bar" :style="'width:' + courseInfo.studyRareStr + ';'"></div>
                    </div>
                </div>
                <div class="line"></div>

                <div class="tab-list">
                    <div :class="'tab-item ' + (currentTab==0?'tab-item-active':'')" @click="changeTab(0)">
                        介绍
                    </div>
                    <div :class="'tab-item ' + (currentTab==1?'tab-item-active':'')" @click="changeTab(1)">
                        目录
                    </div>
                    <div :class="'tab-item ' + (currentTab==2?'tab-item-active':'')" @click="changeTab(2)">
                        笔记
                    </div>
                </div>
                <div class="course-info" v-if="currentTab==0">
                    <div class="course-info-title">课程介绍</div>
                    <div class="course-info-content">{{courseInfo.description}}</div>
                </div>
                <div class="course-catalog" v-if="currentTab==1">
                    <div class="catalog-title">课程目录</div>
                    <div class="catalog-list">
                        <div v-for="(item, index) in courseInfo.directory" :key="index" class="catalog-item">
                            <div class="catalog-name" @click="closeOrOpenCatalog(index)">
                                <text>{{item.directoryName}} {{item.name}}</text>
                                <img v-if="item.active" src="/img/img/up.png"/>
                                <img v-else src="/img/img/down.png"/>
                            </div>
                            <div class="catalog-section" v-if="item.active">
                                <div v-for="(iitem, ind) in item.children" :key="ind" class="section-item"
                                     @click="changeSetcion(ind,index)">
                                    <div :class="'square ' + (iitem.id==currentSection.id?'square-active':'')"></div>
                                    <div :class="'section-name ' + (iitem.id==currentSection.id?'section-name-active':'')">
                                        {{iitem.directoryName}} {{iitem.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="course-notes" v-if="currentTab==2">
                    <div v-for="(item, index) in courseInfo.courseSectionNotesVoList" :key="index" class="note-item">
                        <div class="note-user">
                            <div class="user-left">
                                <img v-if="item.userAvatar" :src="item.userAvatar"/>
                                <img v-else src="/img/img/avator.png"/>
                                <text>{{item.userName}}</text>
                            </div>
                            <div class="user-right">{{item.sectionDirectoryName}}课时</div>
                        </div>
                        <div class="note-info">
                            <div class="note">{{item.notesInfo}}</div>
                            <div class="note-date">{{item.createTime}}</div>
                        </div>
                    </div>
                    <div class="more-notes" v-if="courseInfo.courseSectionNotesVoList.length>0" @click="moreNotes">
                        查看更多
                    </div>
                </div>
                <div class="line"></div>
                <div class="recommend">
                    <div class="recommend-title">相关课程</div>
                    <scroll-div class="course-list" scroll-x="true">
                        <div v-for="(item, index) in recommendList" :key="index" class="course-item">
                            <router-link :to="{name:'CourseInfo',query:{courseId:item.id}}">
                                <img :src="item.cover"/>
                                <div class="recommend-course-name one-ellipsis">{{item.name}}</div>
                            </router-link>
                        </div>
                    </scroll-div>
                </div>
            </div>
            <div class="btn-group" v-if="courseInfo.id">
                <div class="left-btn" @click="collectCourseOrCancel">
                    <img v-if="!courseInfo.isCollect" src="/img/img/collect-none.png"/>
                    <img v-else src="/img/img/collected.png"/>
                    <text>{{courseInfo.isCollect?'取消收藏':'收藏本课'}}</text>
                </div>
                <div class="right-btn" @click="writeNote">
                    <img src="/img/img/note.png"/>
                    <text>记笔记</text>
                </div>
            </div>
        </div>
        <div class="container" v-if="authCode==407||authCode==408||authCode==500">
            <div class="no-data">
                <div class="no-wrap" v-if="authCode==407">
                    <img src="/img/img/noauth.png"/>
                    <div class="no-title">暂无权限</div>
                </div>
                <div class="no-wrap" v-if="authCode==408">
                    <img src="/img/img/nocontent.png"/>
                    <div class="no-title">暂无内容</div>
                </div>
                <div class="no-wrap" v-if="authCode==500">
                    <img src="/img/img/nonet.png"/>
                    <div class="no-title">暂无网络</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                courseId: '',
                courseInfo: {},
                recommendList: [],
                currentSection: {},
                currentTab: 0,
                authCode: ''
            }
        },
        created() {
            this.courseId = this.$route.query.courseId;
            this.getCourseInfo();
            this.getRecommend();
        },
        methods: {
            // 获取课程详情
            getCourseInfo() {
                this.$store.dispatch('actionGetCourseInfo', this.courseId).then(res => {
                    if (res.code === 200) {
                        res.data.directory.map(function (item, index) {
                            if (index == 0) {
                                item.active = true;
                            } else {
                                item.active = false;
                            }

                            return item;
                        });
                        this.courseInfo = res.data;
                        this.currentSection = res.data.directory[0].children[0];
                    } else if (res.code === 407 || res.code === 408) {
                        this.authCode = res.code;
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1500);
                    } else {
                        this.authCode = 500;
                    }
                });
            },
            //获取相关推荐
            getRecommend() {
                this.$store.dispatch('actionGetRecommend', {
                    courseId: this.courseId,
                    size: 6
                }).then(res => {
                    if (res.code === 200) {
                        this.recommendList = res.data;
                    } else {
                        this.$toast(res.msg);
                    }
                });
            },
            // 打开文件
            openFile() {
                // let currentSection = this.currentSection;
                this.studyUpdate();
            },
            studyUpdate() {
                let currentSection = this.currentSection;
                this.$store.dispatch('actionStudyUpdate', {
                    trainCourseId: this.courseId,
                    trainCourseSectionId: currentSection.id
                }).then(res => {
                    if (res.code === 200) {
                        console.log("增加学习记录"); // this.getStudyProgress();
                        this.courseInfo.studyRareStr = res.studyRateStr || 0;
                    } else {
                        console.log(res.msg);
                    }
                });
            },
            // 打开或关闭章节目录
            closeOrOpenCatalog(index) {
                let directory = this.courseInfo.directory;
                directory = directory.map(function (item, ind) {
                    if (ind == index) {
                        item.active = !item.active;
                    } else {
                        item.active = false;
                    }

                    return item;
                });
                this.courseInfo.directory = directory;
            },
            // 更换章节
            changeSetcion(index, pindex) {

                let directory = this.courseInfo.directory;
                let currentSection = this.currentSection;

                if (directory[pindex].children[index].id == currentSection.id) {
                    return;
                } else {
                    if (currentSection.type == 1) {
                        this.videoContext.pause();
                    }
                    currentSection = directory[pindex].children[index];
                    this.currentSection = currentSection;
                } // console.log(this.data.currentSection);

            },
            collectCourseOrCancel() {
                let courseInfo = this.courseInfo;
                this.$store.dispatch('actionCollectCourse', this.courseId).then(res => {
                    if (res.code === 200) {
                        if (courseInfo.isCollect) {
                            this.courseInfo.isCollect = false;
                        } else {
                            this.courseInfo.isCollect = true;
                        }
                    } else {
                        console.log(res.msg);
                    }
                });
            },
            moreNotes() {
                this.$router.push({
                    name: 'CourseNotes',
                    query: {
                        courseId: this.courseId
                    }
                });
            },
            writeNote() {
                this.$router.push({
                    name: 'WriteNote',
                    query: {
                        courseId: this.courseId,
                        courseName: this.courseInfo.name
                    }
                });
            },
            changeTab(index) {
                if (this.currentTab == index) {
                    return;
                } else {
                    this.currentTab = index;
                }
            },
            getStudyProgress() {
                this.$store.dispatch('actionGetStudyProgress', this.courseId).then(res => {
                    if (res.code === 200) {
                        this.courseInfo.studyRareStr = res.studyRareStr || 0;
                    } else {
                        console.log(res.msg);
                    }
                });
            }
        },
    }
</script>

<style scoped>
    page, .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .video-wrap {
        width: 100%;
        height: 422px;
        position: relative;
    }

    .course-img {
        width: 100%;
        height: 422px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 8;
    }

    .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pdf-title {
        width: 400px;
        color: #fff;
        font-size: 40px;
        text-align: center;
    }

    .btn-download {
        width: 200px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0 9px 16px 0 rgba(46, 175, 113, 0.18);
        background: #2eaf71;
        font-size: 32px;
        color: #fff;
        margin: 0 auto;
        margin-top: 32px;
    }

    #my-video {
        width: 100%;
        height: 100%;
    }

    .course-wrap {
        height: calc(100% - 532px);
        padding-bottom: 32px;
        /* padding: 0 32px; */
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    .course-name-box {
        width: 100%;
        display: flex;
        padding: 32px;
        align-items: center;
        justify-content: space-between;
    }

    .course-name {
        max-width: 576px;
        font-size: 36px;
        color: #303131;
    }

    .share {
        padding-left: 30px;
        text-align: center;
        position: relative;
    }

    .btn-hidden {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .share img {
        width: 36px;
        height: 36px;
    }

    .btn-share {
        font-size: 24px;
        color: #666;
    }

    .learn-progress {
        padding: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .learn-progress text {
        font-size: 28px;
        color: #303113;
    }

    .progress-bg {
        width: 460px;
        height: 32px;
        position: relative;
        background: #e0e0e0;
        border-radius: 16px;
    }

    .progress-bar {
        width: 0;
        max-width: 100%;
        height: 32px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 16px;
        background-image: linear-gradient(90deg, #5bd8aa 0%, #2eaf71 100%);
    }

    .line {
        height: 16px;
        background: #f7f7f9;
    }

    .tab-list {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 96px;

        border-bottom: 1px solid #f4f4f4;
    }

    .tab-item {
        height: 95px;
        line-height: 95px;
        margin-left: 166px;
        font-size: 32px;
        color: #303131;
    }

    .tab-item:first-child {
        margin-left: 0;
    }

    .tab-item-active {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #2eaf71;
        border-bottom: 2px solid #2eaf71;
    }

    .course-info {
        padding: 0 32px 32px 32px;
    }

    .course-info-title {
        padding: 40px 0 24px 0;
        font-size: 36px;
        color: #666;
    }

    .course-info-content {
        font-size: 30px;
        color: #303131;
    }

    .course-catalog {
        margin-top: 80px;
        padding: 0 32px;
    }

    .catalog-title {
        font-size: 36px;
        color: #666;
    }

    .catalog-item {
        border-bottom: 2px solid #f0f0f0;
    }

    .catalog-name {
        padding: 40px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .catalog-name text {
        font-size: 32px;
        color: #000;
    }

    .catalog-name img {
        width: 40px;
        height: 40px;
    }

    .section-item {
        display: flex;
        align-items: center;
        padding: 30px 0;
    }

    .square {
        width: 24px;
        height: 24px;
        background: #eee;
    }

    .square-active {
        background: #2eaf71;
    }

    .section-name {
        font-size: 30px;
        color: #303131;
        margin-left: 20px;
        width: calc(100% - 44px);
        overflow-x: hidden;
        text-overflow: ellipsis;
    }

    .section-name-active {
        color: #2eaf71;
    }

    .course-notes {
        padding: 0 32px;
    }

    .note-item {
        padding: 40px 0;
        border-bottom: 1px solid #f4f4f4;
    }

    .note-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .user-left {
        display: flex;
        align-items: center;
    }

    .user-left img {
        width: 64px;
        height: 64px;
        border-radius: 32px;
    }

    .user-left text {
        display: inline-flex;
        font-size: 32px;
        color: #2eaf71;
        max-width: 320px;
        margin-left: 26px;
    }

    .user-right {
        max-width: 270px;
        font-size: 28px;
        color: #666;
    }

    .note-info {
        padding-left: 88px;
        margin-top: 24px;
    }

    .note {
        font-size: 28px;
        color: #303131;
    }

    .note-date {
        margin-top: 32px;
        font-size: 28px;
        color: #979797;
    }

    .more-notes {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: #707070;
    }

    .recommend {
        padding: 0 32px;
    }

    .recommend-title {
        font-size: 36px;
        color: #071836;
        padding: 40px 0;
    }

    .course-list {
        width: 100%;
        height: 348px;
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .course-item {
        width: 340px;
        margin-left: 6px;
        display: inline-block;
        vertical-align: middle;
    }

    .course-item navigator {
        width: 100%;
    }

    .course-item navigator img {
        width: 100%;
        height: 192px;
        border-radius: 8px;
    }

    .recommend-course-name {
        font-size: 32px;
        color: #303131;
        margin-top: 20px;
        width: 100%;
    }

    .course-item:first-child {
        margin-left: 0;
    }

    .btn-group {
        width: 100%;
        padding: 0 32px;
        position: fixed;
        left: 0;
        bottom: 0;
        height: 110px;
        border-top: 1px solid #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
    }

    .left-btn {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .left-btn img {
        width: 40px;
        height: 40px;
    }

    .left-btn text {
        font-size: 32px;
        color: #666;
        margin-left: 10px;
    }

    .right-btn {
        width: 320px;
        height: 88px;
        background: #2eaf71;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right-btn img {
        width: 30px;
        height: 30px;
    }

    .right-btn text {
        font-size: 32px;
        color: #fff;
        margin-left: 12px;
    }
</style>
