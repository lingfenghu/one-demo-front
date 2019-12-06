<template>
    <div>
        <div v-if="isShow" class="entire-info">
        <Form ref="form" :model="entireForm" :rules="ruleValidate" :label-width="100">
            <Row>
                <Col span="16">
                    <Row>
                        <Col span="12">
                        <Form-item prop="staffName" label="姓名">
                            <Input prefix="ios-person"  class="form-item" type="text" v-model="entireForm.staffName" placeholder="姓名"></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item prop="sex" label="性别">
                            <Radio-group class="form-item" v-model="entireForm.sex">
                                <Radio label="0">保密</Radio>
                                <Radio label="1">女</Radio>
                                <Radio label="2">男</Radio>
                            </Radio-group>
                        </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <Form-item prop="identityId" label="身份证号">
                            <Input class="form-item" type="text" v-model="entireForm.identityId" placeholder="身份证号" disabled>
                            </Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item prop="age" label="年龄">
                            <InputNumber class="form-item" v-model="entireForm.age" :max="200" :min="15" readonly placeholder="年龄" @on-blur="ageRange"></InputNumber>
                        </Form-item>
                        </Col>
                    </Row>
                </Col>
                <Col span="8">
                <Form-item prop="avatar" label="头像">
                    <Upload
                        class="avatar-upload"
                        :before-upload="handleUpload"
                        action="">
                        <img src="" style="width: 75px;height: 105px"></img>
                    </Upload>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Form-item prop="tel" label="手机号码">
                    <Input class="form-item" prefix="ios-phone-portrait" type="tel" v-model="entireForm.tel" placeholder="手机号码"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item prop="cardId" label="从业卡号">
                    <Input class="form-item" prefix="ios-card" type="text" v-model="entireForm.cardId" placeholder="从业卡号" disabled></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item prop="grade" label="等级">
                    <Select class="form-item" v-model="entireForm.grade">
                        <Option v-for="item in grades" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Form-item prop="jobType" label="工种" v-model="entireForm.salaryCardId">
                    <Select class="form-item" v-model="entireForm.jobType">
                        <Option v-for="item in jobTypes" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="8">
                <!-- <Form-item prop="jobGrade" label="从业等级">
                    <Input class="form-item" prefix="ios-podium-outline" type="text" v-model="entireForm.jobGrade" placeholder="从业等级"></Input>
                </Form-item> -->
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Form-item prop="enterprise" label="从事企业">
                    <Input class="form-item" prefix="ios-briefcase" type="text" v-model="entireForm.enterprise" placeholder="从事企业"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item prop="salaryCardId" label="工资卡号">
                    <Input class="form-item" prefix="ios-card-outline" type="number" v-model="entireForm.salaryCardId" placeholder="工资卡号"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item prop="project" label="从事工程">
                    <Input class="form-item" prefix="ios-document" type="text" v-model="entireForm.project" placeholder="从事工程"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Form-item>
                    <Button class="submit" type="primary" @click="handleSubmit('form')">提交</Button>
                </Form-item>
                </Col>
            </Row>
        </Form>
        </div>
        <div v-if="!isShow">
            <p class="tip">请先去人员信息管理页选择人员</p>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'entireinfo',
    data(){
        return{
            entireForm: {
                staffId: '',
                staffName: '',
                sex: '',
                identityId: '',
                age: '',
                tel: '',
                cardId: '',
                grade: '',
                jobType: '',
                jobGrade: '',
                enterprise: '',
                salaryCardId: '',
                project: ''
            },
            staff: '',
            grades: [
                {
                    value: 'A',
                    label: 'A级'
                },
                {
                    value: 'B',
                    label: 'B级'
                },
                {
                    value: 'C',
                    label: 'C级'
                }
            ],
            jobTypes: [
                {
                    value: '普通',
                    label: '普通工种'
                },
                {
                    value: '特殊',
                    label: '特殊工种'
                }
            ],
            ruleValidate: {
                staffName: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur'}
                ],
                identityId: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' },
                ],
                jobGrade: [
                    { required: true, message: '请填写从业等级', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                    { pattern: /^(\d{11})$/,message: "手机号码格式不正确"}
                ],
                cardId: [
                    { required: true, message: '请填写卡号', trigger: 'blur' }
                ],
                salaryCardId: [
                    { required: true, message: '请填写工资卡号', trigger: 'blur' }
                ],
            },
            isShow: false 
        }
    },
    methods: {
        handleSubmit(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.entireForm)
                    this.axios.put('/staff',this.entireForm)
                    .then((response) => {
                        this.$Message.success('信息提交成功');
                        // setTimeout(() => {
                            
                        // }, 1000);
                    })
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        ageRange(){
            if(this.entireForm.age<1){
                this.entireForm.age = 1
            }
            if(this.entireForm.age>200){
                this.entireForm.age = 200
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            if(this.$route.query.info!=null){
                this.staff = this.$route.query.info
                this.entireForm = this.staff
                if(this.staff.sex === "男"){
                    this.entireForm.sex = '2';
                }else if(this.staff.sex === "女"){
                    this.entireForm.sex = '1';
                }else{
                    this.entireForm.sex = '0';
                }
                
            }
        })
    },
    watch:{
        staff: function (val, oldVal) {
            if(val != ''){
                this.isShow = true
            }
        }
    }
}
</script>

<style scoped>
.entire-info{
    height: 480px;
}
.form-item{
    width: 80%;
    margin-bottom: 3%
}
.submit{
    margin-top: 10px;
}
.tip{
    text-align: center
}
</style>