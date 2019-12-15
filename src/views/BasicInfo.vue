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
                        <!-- <Form-item prop="avatar" label="头像">
                            <Upload class="avatar-upload"
                                ref="upload"
                                :format="['jpeg','jpg','png']"
                                action="/api/avatar/upload"
                                accept="image/png, image/jpeg, image/png"
                                :max-size="10240"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload">
                                <img src="" style="width: 75px;height: 105px"></img>
                            </Upload> -->
                        </Form-item>
                    </Col>
                </Row>
            </div>
            <Divider />
            <div>
                <h3>其他信息</h3>
                <Row>
                    <Col span="8">
                        <Form-item prop="grade" label="等级">
                            <Select class="form-item" disabled  prefix="ios-podium-outline" v-model="basicForm.grade" placeholder="等级">
                                <Option v-for="item in grades" :value="item.value" :key="item">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <!-- <Form-item prop="jobGrade" label="从业等级">
                            <Input class="form-item" prefix="ios-podium-outline" type="text" v-model="basicForm.jobGrade" placeholder="从业等级"></Input>
                        </Form-item> -->
                    </Col>
                    <Col span="8">
                        <Form-item prop="tel" label="手机号码">
                            <Input class="form-item" prefix="ios-phone-portrait" type="number" v-model="basicForm.tel" placeholder="手机号码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <!-- <Form-item prop="cardId" label="卡号">
                            <Input class="form-item" prefix="ios-card" disabled type="text" v-model="basicForm.cardId" placeholder="卡号"></Input>
                        </Form-item> -->
                    </Col>
                </Row>
                <Row>
                    <Col span="16">
                        <Form-item prop="salaryCardId" label="工资卡号">
                            <Input class="form-item" prefix="ios-card-outline" type="number" maxlength="20" v-model="basicForm.salaryCardId" placeholder="工资卡号"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item prop="jobType" label="工种" v-model="basicForm.salaryCardId">
                            <Select class="form-item" v-model="basicForm.jobType">
                                <Option v-for="item in jobTypes" :value="item.value" :key="item">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item prop="enterprise" label="从事企业">
                            <Select v-model="basicForm.companyId" prefix="ios-briefcase" @on-change="getProjects()" clearable transfer>
                                <Option v-for="item in enterprises" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <!-- <Input class="form-item" prefix="ios-briefcase" type="text" v-model="basicForm.enterprise" placeholder="从事企业"></Input> -->
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item prop="project" label="从事工程">
                            <Select v-model="basicForm.projectList" prefix="ios-document" max-tag-count='2' multiple transfer>
                                <Option v-for="item in projects" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <!-- <Input class="form-item" prefix="ios-document" type="text" v-model="basicForm.project" placeholder="从事工程"></Input> -->
                        </Form-item>
                    </Col>
                    <Col span="8">

                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('form')">提交</Button>
                            <Button @click="handleReset('form')" style="margin-left: 15px">重置</Button>
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
                staffName: '',
                sex: '',
                identityId: '',
                grade: 'C',
                // jobGrade: '',
                tel: '',
                // cardId: '',
                salaryCardId: '',
                companyId: '',
                jobType: '',
                projectList: []
            },
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
            enterprises: [],
            projects: [],
            ruleValidate: {
                staffName: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur'}
                ],
                identityId: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' },
                    { pattern: /^(\d{15}|(\d{17}(\d|X)))$/, message: "证件号码格式不正确"}
                ],
                grade: [
                    { required: true, message: '请选择等级', trigger: 'blur' },
                ],
                // jobGrade: [
                //     { required: true, message: '请填写从业等级', trigger: 'blur' }
                // ],
                tel: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                    { pattern: /^(\d{11})$/,message: "手机号码格式不正确"}
                ],
                // cardId: [
                //     { required: true, message: '请填写卡号', trigger: 'blur' }
                // ],
                salaryCardId: [
                    { required: true, message: '请填写工资卡号', trigger: 'blur' }
                ],
            },
            avatarUrl: '',
            uploadList: []
        }
    },
    methods: {
        getEnterprises(){
            this.enterprises = []
            this.axios.get('enterprise')
            .then((response) => {
                console.log(response)
                response.data.object.forEach((item)=>{
                    var temp = {}
                    temp.label = item.companyName
                    temp.value = item.companyId
                    this.enterprises.push(temp);
                })
            })
            this.getProjects()
        },
        getProjects(){
            console.log(this.basicForm.companyId)
            this.basicForm.projectList = []
            this.projects = []
            this.axios.get('enterprise/projects',{
                params: {
                    companyId: this.basicForm.companyId
                }
            })
            .then((response) => {
                console.log(response)
                response.data.object.forEach((item)=>{
                    var temp = {}
                    temp.label = item.projectName
                    temp.value = item.projectId
                    this.projects.push(temp);
                })
            })
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + '是不正确的,请选择png jpg jpeg图片格式'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件大小不正确',
                desc: file.name + '体积太大,请选择不超过10M的文件'
            });
        },
        handleSubmit(form) {
            console.log(this.basicForm)
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.axios({
                        method: 'post',
                        url: '/staff',
                        data: this.basicForm
                    }).then((response) => {
                        //新增成功后清空表单数据
                        this.handleReset(form)
                        this.$Message.success('信息提交成功');
                        this.$parent.gotoPage('stafflist')
                    })                    
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (form) {
            this.$refs[form].resetFields();
        }
    },
    mounted: function () {
        //页面加载完成后函数
        this.$nextTick(function () {
            this.getEnterprises()
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
</style>