<template>
    <div class = 'basicinfo'>
        <div class="layout-content">
        <Form ref="form" :model="basicForm" :rules="ruleValidate" :label-width="100">
            <div>
                <h3>基本信息</h3>
                <!-- prop动态验证 -->
                <Row>
                    <Col span="16">
                        <Row>
                            <Col span="12">
                                <Form-item prop="staffName" label="姓名">
                                    <Input prefix="ios-person"  class="form-item" type="text" v-model="basicForm.staffName" placeholder="姓名"></Input>
                                </Form-item>
                            </Col>
                            <Col span="12">
                                <Form-item prop="sex" label="性别">
                                    <Radio-group class="form-item" v-model="basicForm.sex">
                                        <Radio label=0>保密</Radio>
                                        <Radio label=1>女</Radio>
                                        <Radio label=2>男</Radio>
                                    </Radio-group>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <Form-item prop="identityId" label="身份证号">
                                    <Input class="form-item" type="text" v-model="basicForm.identityId" placeholder="身份证号">
                                    </Input>
                                </Form-item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="8">
                        <Form-item prop="avatar" label="头像">
                            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 80px" height="112px">
                            <!-- <Input prefix="ios-image" class="avatarImg" icon="transgender" type="file" v-model="basicForm.avatar"> -->
                        </Form-item>
                    </Col>
                </Row>
            </div>
            <hr>
            <div>
                <h3>其他信息</h3>
                <Row>
                    <Col span="8">
                        <Form-item prop="jobGrade" label="从业等级">
                            <Input class="form-item" prefix="ios-podium-outline" type="text" v-model="basicForm.jobGrade" placeholder="从业等级"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item prop="tel" label="手机号码">
                            <Input class="form-item" prefix="ios-phone-portrait" type="text" v-model="basicForm.tel" placeholder="手机号码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item prop="cardId" label="卡号">
                            <Input class="form-item" prefix="ios-card" type="text" v-model="basicForm.cardId" placeholder="卡号"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                    <Form-item prop="salaryCardId" label="工资卡号">
                        <Input class="form-item" prefix="ios-card-outline" type="text" v-model="basicForm.salaryCardId" placeholder="工资卡号"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('form')">提交</Button>
                        </Form-item>
                    </Col>
                    
                </Row>
            </div>
        </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'basicinfo',
    data () {
        return {
            basicForm: {
                // staffName: '',
                // sex: "",
                // identityId: '',
                // jobGrade: '',
                // tel: '',
                // cardId: '',
                // salaryCardId: '',
                staffName: 'aaa',
                sex: '1',
                identityId: '1234567890',
                jobGrade: '教师资格一级',
                tel: '12345678999',
                cardId: 'Y0000006',
                salaryCardId: '3700',
            },
            ruleValidate: {
                staffName: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur'}
                ],
                identityId: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' },
                    // { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                jobGrade: [
                    { required: true, message: '请填写从业等级', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                ],
                cardId: [
                    { required: true, message: '请填写卡号', trigger: 'blur' }
                ],
                salaryCardId: [
                    { required: true, message: '请填写工资卡号', trigger: 'blur' }
                ],
            },
            avatarUrl: '',
            
        }
    },
    methods: {
        handleSubmit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.basicForm)
                    this.axios({
                        method: 'post',
                        url: '/staff',
                        data: this.basicForm
                        // {
                        //     staffName: this.form.staffName,
                        //     sex: this.form.sex,
                        //     identityId: this.form.identityId,
                        //     jobGrade: this.form.jobGrade,
                        //     tel: this.form.tel,
                        //     cardId: this.form.cardId,
                        //     salaryCardId: this.form.salaryCardId,
                        // }
                    }).then(function (response) {
                        console.log(response)

                    }).catch(function (error) {
                        console.log(error);
                    });
                    // this.$Message.success('新增人员基础信息提交成功!')

                    //     that.axios({
                    //         method: 'put',
                    //         url: '/staff',
                    //         data: {
                    //             staffId: infoGet.staffId,
                    //             staffName: this.form.staffName,
                    //             sex: this.form.sex,
                    //             identityId: this.form.identityId,
                    //             jobGrade: this.form.jobGrade,
                    //             tel: this.form.tel,
                    //             cardId: this.form.cardId,
                    //             salaryCardId: this.form.salaryCardId,
                    //         }
                    //     }).then(function (response) {
                    //         console.log(response)
                    //     });
                    //     this.$Message.success('修改提交成功!')
                    // }else{
                    //     
                    // }
                    
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(this.infoGet)
            // if(this.infoGet!=null){
            //     console.log("33333333333")
            //     this.form = this.infoGet
            // }
        })
    }
}
</script>

<style scoped>
.layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.form-item{
    width: 80%;
    margin-bottom: 3%
}
hr{
    margin-bottom: 3%
}
/* .avatarImg{
    width: 200px;
    height: 400px;
} */
</style>