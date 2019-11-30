
<template>
    <div>
        <div class="search-bar">
            <Form :model="staffForm" :label-width="100">
            <Row :gutter="20">
                <Col span="6">
                <Form-item label="从事工程">
                    <Select v-model="staffForm.project" placeholder="选择工程">
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
                project: '',
                cardId: '',
                staffName: ''
            },
            projectList: '',
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    fixed: 'left',
                    width: 65,
                },
                {
                    title: '从事企业',
                    key: 'enterprise'
                },
                {
                    title: '从事工程',
                    key: 'project'
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
            // console.log(row)
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
            this.axios({
            method: 'delete',
            url: '/staff',
                params: {
                    staffId: row.staffId
                }
            }).then((response) =>{
                console.log(response);
                if(200 === response.data.code){
                    this.initTable()
                }
            }).catch((error) =>{
                console.log(error);
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
            this.axios.get('/staff', {
                params: {
                    project: this.staffForm.project,
                    cardId: this.staffForm.cardId,
                    staffName: this.staffForm.staffName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then((response) =>{
                console.log(response);
                var index = 0;
                if(200 === response.data.code){
                    this.total = response.data.object.total
                    this.pageNum = response.data.object.pageNum
                    this.pageSize = response.data.object.pageSize
                    response.data.object.list.forEach((item)=>{
                        index++
                        item.index = (this.pageNum-1)*this.pageSize+index
                        if(item.sex === 0){
                            item.sex = '保密'
                        }else if(item.sex === 1){
                            item.sex = '女'
                        }else{
                            item.sex = '男'
                        }
                    })
                    this.tableData = response.data.object.list
                }else{
                    this.$Message.error('数据查询失败',5);
                }
            }).catch(function (error) {
                console.log(error);
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