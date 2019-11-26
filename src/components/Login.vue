<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="username" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{usernameError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <div class="input-c">
                <Row>
                    <Col span="12">
                        <Input type="text" v-model="code" prefix="heart" placeholder="验证码" clearable @on-blur="verifyCode"/>
                        <p class="error">{{codeError}}</p>
                    </Col>
                    <Col span="12">
                        <div class="block">
                            <img :src="imageCode" @click="getImgCode"></img>
                        </div>
                    </Col>
                </Row>
                <p class="error">{{codeError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: 'lisi',
            pwd: '123456',
            usernameError: '',
            pwdError: '',
            codeError: '',
            isShowLoading: false,
            bg: {},
            code: '',
            imageCode: 'http://localhost:8080/user/getAuthCode',
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        verifyAccount(e) {
            if (this.username !== 'admin') {
                this.usernameError = '账号为admin'
            } else {
                this.usernameError = ''
            }
        },
        verifyPwd(e) {
            if (this.pwd !== 'admin') {
                this.pwdError = '密码为admin'
            } else {
                this.pwdError = ''
            }
        },
        verifyCode(e) {
            if (this.code !== '') {
                this.codeError = '验证码无需填入'
            } else {
                this.codeError = ''
            }
        },
        getImgCode(){
            let that = this
            var randomNum = Math.random
            this.axios.get('/user/getAuthCode?num='+randomNum)
            .then(function (response) {
                console.log(response);
                that.imageCode = 'http://localhost:8080/user/getAuthCode?'+randomNum;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        register() {
            console.log('注册账号')
        },
        forgetPwd() {
            console.log('忘记密码')
        },
        submit() {
            let that = this
            this.axios.post('/user/login', {
                username: this.username,
                password: this.pwd
            })
            .then(function (response) {
                console.log(response);
                if(200 === response.data.code){
                    that.isShowLoading = true
                    // 登陆成功 设置用户信息
                    localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
                    localStorage.setItem('userName', '小明')
                    // 登陆成功 假设这里是后台返回的 token
                    localStorage.setItem('token', response.data.object)
                    that.$router.push({path: that.redirect || '/'})
                }else{
                    if(401 === response.data.code){
                        localStorage.removeItem('token')
                        that.$router.push('/login')
                    }
                    // if (this.username !== 'admin') {
                    //     this.usernameError = '账号为admin'
                    // } 
                    // if (this.pwd !== 'admin') {
                    //     this.pwdError = '密码为admin'
                    // } 
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
            //无验证
            if (this.username === 'admin' && this.pwd === 'admin') {
                // this.isShowLoading = true
                // // 登陆成功 设置用户信息
                // localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
                // localStorage.setItem('userName', '小明')
                // // 登陆成功 假设这里是后台返回的 token
                // localStorage.setItem('token', 'i_am_token')
                // this.$router.push({path: this.redirect || '/'})
            } else {
                // if (this.username !== 'admin') {
                //     this.usernameError = '账号为admin'
                // } 
                // if (this.pwd !== 'admin') {
                //     this.pwdError = '密码为admin'
                // } 
            }
        }
    },
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


