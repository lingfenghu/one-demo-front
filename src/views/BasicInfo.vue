<template>
    <div id = 'basicinfo'>
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
            <h3>基本信息</h3>
            <Form-item prop="staffName" label="姓名">
                <Input type="text" v-model="form.staffName" placeholder="姓名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="identityId" label="身份证号">
                <Input type="text" v-model="form.identityId" placeholder="身份证号">
                    <Icon type="" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="sex" label="性别">
                <Radio-group v-model="form.sex">
                    <Radio label=1>女</Radio>
                    <Radio label=2>男</Radio>
                </Radio-group>
            </Form-item>
            <Form-item prop="avatar" label="头像">
                <Input type="file" v-model="form.avatar">
                    <Icon type="" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <hr>
            <h3>其他信息</h3>
            <Form-item prop="jobGrade" label="从业等级">
                <Input type="text" v-model="form.jobGrade" placeholder="从业等级">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="tel" label="手机号码">
                <Input type="text" v-model="form.tel" placeholder="手机号码">
                    <Icon type="iphone" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="cardId" label="卡号">
                <Input type="text" v-model="form.cardId" placeholder="卡号">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="salaryCardId" label="工资卡号">
                <Input type="text" v-model="form.salaryCardId" placeholder="工资卡号">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('form')">提交</Button>
            </Form-item>
        </Form>
        <div class="layout-copy">
            2019-202x &copy; hulingfeng
        </div>
    </div>
</template>

<script>
export default {
    name: 'basicinfo',
    data () {
        return {
            form: {
                staffName: 'xiaohong',
                sex: "1",
                identityId: '360428199805224935',
                jobGrade: '小学老师一级',
                tel: '13225079670',
                cardId: 'Y0000009',
                salaryCardId: '0000 0000 0000 0000',
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
                    { type: 'string'}
                ],
                cardId: [
                    { required: true, message: '请填写卡号', trigger: 'blur' }
                ],
                salaryCardId: [
                    { required: true, message: '请填写工资卡号', trigger: 'blur' }
                ],
            },
            url: '',
            infoGet: this.$route.query.info
        }
    },
    methods: {
        handleSubmit(name) {
            let that = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    that.axios({
                        method: 'post',
                        url: '/staff/',
                        data: {
                            staffName: this.form.staffName,
                            sex: this.form.sex,
                            identityId: this.form.identityId,
                            jobGrade: this.form.jobGrade,
                            tel: this.form.tel,
                            cardId: this.form.cardId,
                            salaryCardId: this.form.salaryCardId,
                        }
                    }).then(function (response) {
                        console.log(response)
                    });
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');

                }
            })
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(this.infoGet)
            this.form = this.infoGet
        })
    }
}
</script>

<style scoped>
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
</style>