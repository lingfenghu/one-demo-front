<template>
    <div>
        <div class="search-bar">
            <Form :model="staffForm" :label-width="100">
            <Row :gutter="20">
                <Col span="6">
                <Form-item label="从事工程">
                    <Select v-model="staffForm.projectId" placeholder="选择工程" clearable>
                        <Option v-for="item in projectList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="卡号">
                    <Input v-model="staffForm.cardId" placeholder="输入卡号" clearable></Input>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="姓名">
                    <Input v-model="staffForm.staffName" placeholder="输入姓名" clearable></Input>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item>
                    <Button type="primary" shape="circle" icon="ios-search" @click="search">开始查询</Button>
                </Form-item>
                </Col>
            </Row>
            </Form>
        </div>
        <div>
            <Table stripe :columns="columns" :data="tableData"></Table>
        </div>
        <div>
            <Page v-if="total!=0" class="page" :total="total" :current="pageNum"  :page-size="pageSize" show-total show-sizer show-elevator @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
    </div>

</template>

<script>
export default {
    name: 'stafflist',
    data () {
        return {
            total: '',
            pageNum: '',
            pageSize: '',
            staffForm: {
                projectId: '',
                cardId: '',
                staffName: ''
            },
            projectList: [],
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    fixed: 'left',
                    width: 65,
                },
                {
                    title: '从事企业',
                    key: 'companyName'
                },
                {
                    title: '从事工程',
                    key: 'projectNameList'
                },
                {
                    title: '卡号',
                    key: 'cardId'
                },
                {
                    title: '姓名',
                    key: 'staffName',
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '手机号码',
                    key: 'tel'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'action',
                    fixed: 'right',
                    width: 150,
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
                                        this.update(params.row)
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
                                        console.log(params.row)
                                        this.remove(params.row)
                                    }
                                }
                            },'删除')
                        )
                        return h('div',arr)
                    }
                },
            ],
            tableData: [],
        }
    },
    methods: {
        update (row) {
            this.$router.push({
                //这里写要跳转的路径
                path: '/entireinfo',
                name: 'entireinfo',
                query: {
                    info: row
                }
            });
        },
        remove (row) {
            this.$Modal.confirm({
                title: '删除人员信息',
                content: '<p>确认删除该条人员信息吗?</p>',
                onOk: () => {
                    this.axios({
                    method: 'delete',
                    url: '/staff',
                        params: {
                            staffId: row.staffId
                        }
                    }).then((response) =>{
                        console.log(response);
                        this.initTable()
                        this.$Message.success('删除成功');
                    })
                },
                onCancel: () => {
                    // this.$Message.info('你点击了取消');
                }
            });

        },
        getProjectList(){
            this.projectList = []
            this.axios.get('project')
            .then((response) => {
                console.log(response)
                response.data.object.forEach((item)=>{
                    var temp = {}
                    temp.label = item.projectName
                    temp.value = item.projectId
                    this.projectList.push(temp);
                })
            })
        },
        search(){
            this.initTable();
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
            this.getProjectList();
            this.axios.get('/staff', {
                params: {
                    projectId: this.staffForm.projectId,
                    cardId: this.staffForm.cardId,
                    staffName: this.staffForm.staffName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then((response) =>{
                console.log(response)
                var index = 0
                this.total = response.data.object.size
                this.pageNum = response.data.object.pageNum
                this.pageSize = response.data.object.pageSize
                response.data.object.list.forEach((item1)=>{
                    console.log(item1)
                    index++
                    item1.index = (this.pageNum-1)*this.pageSize+index
                    if(item1.sex === 0){
                        item1.sex = '保密'
                    }else if(item1.sex === 1){
                        item1.sex = '女'
                    }else{
                        item1.sex = '男'
                    }
                    item1.companyName = item1.enterprise.companyName
                    var No = 0
                    item1.projectNameList = ''
                    item1.projects.forEach((item2)=>{
                        console.log(item2)
                        No++
                        item1.projectNameList += item2.projectName
                        if(item1.projects.length>No){
                            item1.projectNameList += ' '
                        }
                    })
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
.search-bar{
    text-align: center;
}
.page{
    margin-top: 10px;
}
</style>