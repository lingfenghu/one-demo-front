<template>
    <div>
        <Row class="search-tab">
            <Form ref="form" :model="queryForm" :label-width="100">
            <Col span="6">
                <Form-item label="工种" :model="queryForm">
                    <Select v-model="queryForm.jobType">
                        <Option v-for="item in jobTypes" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="性别">
                    <Select v-model="queryForm.gender">
                        <Option v-for="item in genders" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="等级">
                    <Select v-model="queryForm.grade">
                        <Option v-for="item in grades" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item>
                    <Button type="primary" shape="circle" icon="ios-search" @click="handleSubmit('form')">开始查询</Button>
                </Form-item>
            </Col>
            </Form>
        </Row>
        <div id="chart" class="my-chart"></div>
    </div>
</template>

<script>
export default {
    name: 'agestat',
    data() {
        return{
            queryForm: {
                jobType: '0',
                gender: '-1',
                grade: '0',
            },
            jobTypes: [
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '普通工种'
                },
                {
                    value: '2',
                    label: '特殊工种'
                }
            ],
            genders: [
                {
                    value: '-1',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '保密'
                },
                {
                    value: '1',
                    label: '女'
                },
                {
                    value: '2',
                    label: '男'
                },
                
            ],
            grades: [
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: 'A级'
                },
                {
                    value: '2',
                    label: 'B级'
                },
                {
                    value: '3',
                    label: 'C级'
                }
            ]
        }
    },
    methods: {
        draw(){
            var myChart = this.$echarts.init(document.getElementById('chart'));
            console.log(this.queryForm)
            this.axios.get('statistics/age', {
                params: {
                    jobType: this.queryForm.jobType,
                    sex: this.queryForm.gender,
                    grade: this.queryForm.grade
                }
            }).then(function (response) {
                console.log(response.data.object);
                var barData = []
                var xAxisData = []
                response.data.object.forEach((item)=>{
                    console.log(item)
                    var temp = {}
                    temp.name = item.ageInterval
                    temp.value = item.count
                    xAxisData.push(temp.name)
                    barData.push(temp)
                })
                console.log(barData)
                console.log(xAxisData)
                myChart.setOption({
                    title: { 
                        text: '人员不同年龄段数量',
                        textStyle: {
                            fontFamily: 'Verdana',
                            fontSize: 20,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            color: '#333',
                            left: 'auto',
                            textAligin: 'left'
                        }
                    },
                    tooltip: {},//数据提示
                    xAxis: {
                        data: xAxisData
                    },
                    yAxis: {},
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: barData
                    }]
                });
            })
        },
        handleSubmit(){
            this.draw()
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.draw()
        })
    }
}
</script>

<style scoped>
.search-tab{
    text-align: center;
    margin: 10px;
    padding: 3px;
}
.my-chart{
    width: 50%;
    height: 50%;
}
.my-chart{
    width: 60%;
    height: 350px;
    margin: 2% 20%
}
</style>