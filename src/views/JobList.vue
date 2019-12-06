<template>
<div>
    <div>
        <Table stripe :columns="columns" :data="tableData"></Table>
    </div>
    <div>
        <Page class-name="page" v-if="total!=0" :total="total" :current="pageNum"  :page-size="pageSize" show-total show-sizer show-elevator @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
    </div>
    <div>
        <Modal v-model="updateModal" title="修改工种信息" width="600" :loading="true" @on-ok="submit">
        <Form :model="jobForm" :label-width="100">
            <Form-item label="技能工种">
                <Input class="form-item" v-model="jobForm.skillType" disabled></Input>
            </Form-item>
            <Form-item label="基准工资">
                <Input class="form-item" type="number" v-model='jobForm.standardSalary' placeholder="请输入基准工资"></Input>
            </Form-item>
            <Form-item label="工种类型">
                <Select class="form-item" v-model='jobForm.jobType'>
                    <Option v-for="item in jobTypes" :value="item.value" :key="item">{{item.label}}</Option>
                </Select>
            </Form-item>
        </Form>
        </Modal>
    </Modal>
    </div>
</div>
</template>

<script>
export default {
    name: 'joblist',
    data () {
        return {
            total: '',
            pageNum: '',
            pageSize: '',
            updateModal: false,
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
            jobForm: {
                jobId: '',
                skillType: '',
                standardSalary: '',
                jobType: ''
            },
            columns: [
                {
                    title: '序号',
                    key: 'index'
                },
                {
                    title: '技能工种',
                    key: 'skillType'
                },
                {
                    title: '基准工资',
                    key: 'standardSalary'
                },
                {
                    title: '工种类型',
                    key: 'jobType'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'action',
                    render: (h, params) => {
                        let arr = []
                        arr.push(
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.updateModal = true
                                        //给对话框赋值
                                        this.jobForm.skillType = params.row.skillType
                                        this.jobForm.standardSalary = params.row.standardSalary
                                        this.jobForm.jobType = params.row.jobType
                                        this.jobForm.jobId = params.row.jobId
                                    }
                                }
                            },'修改'),
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    type: "warning"
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
                                    }
                                }
                            },'删除')
                        )
                        return h('div',arr)
                    }
                }
            ],
            tableData: []
        }
    },
    methods: {
        update (newJob) {
            this.axios.put('/job',newJob).then((response) =>{
                console.log(response)
                setTimeout(() => {
                    this.updateModal = false;
                }, 1000);
                this.$Modal.success({
                    title: '修改成功',
                    content: '内容已成功提交'
                });
                this.initTable()
            }).catch((error) =>{
                console.log(error);
                this.$Modal.error({
                    title: '修改失败',
                    content: '服务器错误'
                });
            })
        },
        remove (row) {
            this.$Modal.confirm({
                title: '删除工种信息',
                content: '<p>确认删除该条工种信息吗?</p>',
                onOk: () => {
                    this.axios({
                    method: 'delete',
                    url: 'job',
                        params: {
                            jobId: row.jobId
                        }
                    }).then((response) =>{
                        console.log(response)
                        this.initTable()
                        this.$Message.success('删除成功');
                    })
                },
                onCancel: () => {
                    // this.$Message.info('你点击了取消');
                }
            });

        },
        submit(){
            this.update(this.jobForm)
        },
        handlePage(value){
            this.pageNum = value
            this.initTable()
        },
        handlePageSize(value){
            this.pageSize = value
            this.initTable()
        },
        initTable(){
            this.axios.get('job', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then((response) =>{
                console.log(response)
                var index =0;
                this.total = response.data.object.total
                this.pageNum = response.data.object.pageNum
                this.pageSize = response.data.object.pageSize
                response.data.object.list.forEach((item)=>{
                    index++
                    item.index = (this.pageNum-1)*this.pageSize+index
                })
                this.tableData = response.data.object.list
            })
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.initTable();
        })
    }
}
</script>

<style scoped>
.page{
    margin-top: 10px
}
.update-input{
    margin-right: 50px
}
.form-item{
    width: 80%
}
</style>