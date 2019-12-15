<template>
    <div class="login-vue" :style="login">
        <div class="container">
            <p class="title">WELCOME</p>
            <Form ref="form" :model="loginForm" :rules="ruleValidate">
                <Row>
                    <Col span="24">
                    <FormItem prop="username">
                        <Input prefix="ios-contact" v-model="loginForm.username" placeholder="用户名" clearable/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem prop="password">
                        <Input type="password" v-model="loginForm.password" prefix="md-lock" placeholder="密码" clearable/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem prop="imgCode">
                        <Input type="text" v-model="loginForm.imgCode" prefix="ios-code" placeholder="验证码" clearable/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <img :src="imageCodeUrl" @click="getImgCode"></img>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem>
                        <Button class="submit-button" :loading="isShowLoading" type="primary" @click="handleSubmit('form')">登录</Button>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <p class="extend-info"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p> -->
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: 'admin',
                imgCode: '',
            },
            imageCodeUrl: '',
            isShowLoading: false,
            login: {},
            flag: false,
            ruleValidate: {
                username: [
                    { required: true, message: '请填写账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur'}
                ],
                imgCode: [
                    { required: true, message: '请填写验证码', trigger: 'blur' },
                ]
            },
        }
    },
    created() {
        this.login.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
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
        // verifyCode: function() {
        //     this.axios.post('user/checkCode', {
        //         imgCode: this.loginForm.imgCode
        //     }).then((response) => {
        //         this.flag = response.data
        //         console.log(response.data)
        //         console.log(this.flag)
        //     })
        // },
        getImgCode(){
            var randomNum = Math.random()
            var basicAddress = 'http://localhost:8080/'
            // var basicAddress = 'http://192.168.11.130:8080/'
            var url = basicAddress+'user/getAuthCode?randomNum='+randomNum
            this.axios.get(url)
            .then( (response) => {
                console.log(response)
                this.imageCodeUrl = url
            }).catch(function (error) {
                console.log(error);
            })
        },
        register() {
            console.log('注册账号')
        },
        forgetPwd() {
            console.log('忘记密码')
        },
        handleSubmit(form) {
            // this.verifyCode()
            this.$refs[form].validate((valid) => {
                if (valid) {
                    //验证验证码是否正确
                    this.axios.post('user/checkCode', {
                        imgCode: this.loginForm.imgCode
                    }).then((response) => {
                        console.log(response);
                        this.flag = response.data
                        //验证码正确再验证账号密码
                        if(this.flag === true){
                            this.axios.post('/user/login', {
                                username: this.loginForm.username,
                                password: this.loginForm.password,
                            }).then((response) => {
                                console.log(response);
                                if(200 === response.data.code){
                                    this.isShowLoading = true
                                    // 登陆成功 设置用户信息
                                    localStorage.setItem('userImg', '')
                                    localStorage.setItem('userName', this.loginForm.username)
                                    // 登陆成功 存储后台返回的 token
                                    localStorage.setItem('token', response.data.object)
                                    this.$router.push({path: this.redirect || '/'})
                                }else{
                                    this.$Message.error(response.data.msg);
                                    that.$router.push('/login')
                                }
                            })
                        }else{
                            this.$Message.error('验证码错误');
                        }
                    }).catch((error) => {
                        console.log(error)
                        this.$Message.error("服务器可能崩溃了😂");
                    });
                }
            })
        }
    },
    mounted: function() {
        this.getImgCode()
    }
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
.login-vue .submit-button {
    width: 100%;
}
.login-vue .extend-info {
    margin-top: 1%;
}
.login-vue .extend-info span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>


