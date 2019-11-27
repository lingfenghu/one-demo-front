
<template>
    <div>
        <div class="search-tab">
            <Form :model="formItem" :label-width="80">
            <Row :gutter="20">
                <Col span="6">
                <Form-item label="从事工程">
                    <Select v-model="project" size="large" placeholder="选择工程">
                        <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="卡号">
                    <Input v-model="cardId" size="large" placeholder="输入卡号" clearable></Input>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item label="姓名">
                    <Input v-model="staffName" size="large" placeholder="输入姓名" clearable></Input>
                </Form-item>
                </Col>
                <Col span="6">
                <Form-item>
                    <Button class="search" type="primary" shape="circle" icon="ios-search" @click="searchByParams">开始搜索</Button>
                </Form-item>
                </Col>
            </Row>
            </Form>
        </div>
        <div>
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
        <div>
            <Page v-if="startRow!=0" class="page" :total="total" :current="pageNum"  :page-size="pageSize" show-total show-sizer show-elevator @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        </div>
        <div class="layout-copy">
            2019-202x &copy; hulingfeng
        </div>
    </div>

</template>

<script>
export default {
    name: 'stafflist',
    data () {
        return {
            project: '',
            cardId: '',
            staffName: '',
            total: '',
            pageNum: '',
            pageSize: '',
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
            data: []
        }
    },
    methods: {
        update (row) {
            this.$router.push({
            path: '/basicinfo',              //这里写要跳转的路径
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
            })
            .then((response) =>{
                console.log(response)
                if(200 === response.data.code){
                    this.initTable()
                }else{
                    this.$Message.error('数据删除失败',5);
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        searchByParams(){
            this.axios.get('/staff', {
                params: {
                    project: this.project,
                    cardId: this.cardId,
                    staffName: this.staffName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then((response) =>{
                var index =0;
                if(200 === response.data.code){
                    this.total = response.data.object.total
                    response.data.object.list.forEach((item)=>{
                        index++
                        item.index = (this.pageNum-1)*this.pageSize+index
                    })
                    this.data = response.data.object.list
                }else{
                    this.$Message.error('数据查询失败',5);
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        handlePage(value){
            this.axios.get('/staff', {
                params: {
                    pageNum: value,
                }
            }).then((response) =>{
                console.log(response);
                var index =0;
                if(200 === response.data.code){
                    // this.data = response.data.object.list
                    this.total = response.data.object.total
                    this.pageNum = response.data.object.pageNum
                    this.pageSize = response.data.object.pageSize
                    response.data.object.list.forEach((item)=>{
                        console.log(item)
                        index++
                        item.index = (this.pageNum-1)*this.pageSize+index
                    })
                    this.data = response.data.object.list
                }else{
                    this.$Message.error('数据查询失败',5);
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        handlePageSize(value){
            this.axios.get('/staff', {
                params: {
                    pageSize: value,
                }
            }).then((response) =>{
                // console.log(response);
                var index = 0;
                if(200 === response.data.code){
                    // this.data = response.data.object.list
                    this.total = response.data.object.total
                    this.pageNum = response.data.object.pageNum
                    this.pageSize = response.data.object.pageSize
                    response.data.object.list.forEach((item)=>{
                        console.log(item)
                        index++
                        item.index = (this.pageNum-1)*this.pageSize+index
                    })
                    this.data = response.data.object.list
                }else{
                    this.$Message.error('数据查询失败',5);
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        initTable(){
            this.axios.get('/staff', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
            }).then((response) =>{
                // console.log(response);
                var index =0;
                if(200 === response.data.code){
                    this.total = response.data.object.total
                    this.pageNum = response.data.object.pageNum
                    this.pageSize = response.data.object.pageSize
                    response.data.object.list.forEach((item)=>{
                        // console.log(item)
                        index++
                        item.index = (this.pageNum-1)*this.pageSize+index
                    })
                    this.data = response.data.object.list


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
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.search-tab{
    text-align: center;
    margin: 10px;
    padding: 3px;
}
.search{
    width: 60%
}
.page{
    margin-top: 20px;
    
}
</style>