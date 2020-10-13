<!--
 * User: haixu
 * Date: 2020/10/8
 * Time: 13:49
 -->

<template>
    <div class="login-page">
        <div class="logo">
            <img src="/img/img/logo.png"/>
        </div>
        <div class="login-wrap">
            <div class="item">
                <img src="/img/img/m-phone.png"/>
                <input type="number" v-model="phone" :maxlength="11" placeholder="请输入手机号" auto-focus/>

            </div>
            <div class="item">
                <img src="/img/img/m-lock.png"/>
                <input :type="showPwd?'text':'password'" v-model="password" placeholder="请输入密码"/>
                <img :src="showPwd?'/img/img/eye-close.png':'/img/img/eye.png'" @click="changeState"/>
            </div>
            <div class="btn-login" @click="startLogin">登录</div>
            <div class="tips">若无账号，请联系管理员</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                phone: '',
                //手机号
                disabled: false,
                btnFlag: true,
                showPwd: false,
                //是否显示密码
                password: '', //密码
            }
        },
        methods: {
            // 显示或不显示密码
            changeState: function () {
                this.showPwd = !this.showPwd
            },
            startLogin: function () {
                var that = this;
                let regular = /^1\d{10}$/;
                if (that.phone === '' || that.phone === null) {
                    this.$toast('请输入手机号!');
                    return false;
                }

                if (!regular.test(that.phone)) {
                    this.$toast('手机格式不正确!');
                    return false;
                }

                if (that.btnFlag) {
                    that.btnFlag = false;
                    this.$store.dispatch('actionLogin', {
                        loginName: that.phone,
                        password: that.password
                    }).then(res => {
                        that.btnFlag = true;
                        // console.log(res);
                        if (res.code === 200) {
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('userName', res.data.user.loginName);
                            this.$router.push({
                                path: '/home'
                            });
                        } else {
                            this.$toast(res.msg);
                        }
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .login-page {
        width: 100%;
    }

    .logo {
        width: 278px;
        height: 88px;
        margin: 0 auto;
        margin-top: 106px;
    }

    .logo img {
        width: 100%;
        height: 100%;
    }

    .login-wrap {
        padding: 0 50px;
        margin-top: 128px;
    }

    .item {
        width: 100%;
        display: flex;
        align-items: center;
        height: 92px;
        line-height: 92px;
        background: #f4f4f4;
        border-radius: 8px;
        margin-bottom: 24px;
    }

    .item img {
        width: 40px;
        height: 40px;
        margin: 0 32px;
    }

    .item input {
        width: calc(100% - 200px);
        height: 40px;
        border: none;
        font: normal;
        font-size: 32px;
        background: transparent;
    }

    .btn-sms {
        height: 64px;
        background-color: #fff;
        border-radius: 6px;
        font-family: PingFang-SC-Regular;
        font-size: 28px;
        color: #353535;
        line-height: 64px;
        padding: 0 16px;
        margin: 0;
    }

    .btn-sms[disabled] {
        border: none;
    }

    .btn-login {
        width: 100%;
        height: 88px;
        background-color: #2eaf71;
        border-radius: 8px;
        font-family: PingFang-SC-Regular;
        font-size: 32px;
        color: #fff;
        text-align: center;
        line-height: 88px;
        margin-top: 80px;
    }

    .tips {
        margin-top: 40px;
        font-size: 32px;
        color: #303131;
        width: 100%;
        text-align: center;
    }
</style>
