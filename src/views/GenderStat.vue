<template>
    <div>
        <Row class="search-tab">
            <Form ref="formInline" :label-width="80">
            <Col span="6">
                <Form-item label="工种" :model="queryForm">
                    <Select v-model="queryForm.jobType">
                        <Option v-for="item in jobTypes" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Select>
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="年龄">
                    <Select v-model="queryForm.ageInterval">
                        <Option v-for="item in ageSegments" :value="item.value" :key="item">{{ item.label }}</Option>
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
                    <Button type="primary" shape="circle" icon="ios-search" @click="handleSubmit('formInline')">开始查询</Button>
                </Form-item>
            </Col>
            </Form>
        </Row>
        <div id="chart" class="my-chart"></div>
    </div>
</template>

<script>
export default {
    name: 'genderstat',
    data() {
        return{
            queryForm: {
                jobType: '0',
                ageInterval: '0',
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
            ageSegments: [
                {
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '18-30 岁'
                },
                {
                    value: '2',
                    label: '30-45 岁'
                },
                {
                    value: '3',
                    label: '45-60 岁'
                }
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
            //拿到数据
            this.axios.get('statistics/age', {
                params: {
                    jobType: this.queryForm.jobType,
                    ageInterval: this.queryForm.ageInterval,
                    grade: this.queryForm.grade
                }
            }).then(function (response) {
                console.log(response.data.object);
                var pieData = []
                var legendData = []
                response.data.object.forEach((item)=>{
                    console.log(item)
                    var temp = {}
                    if(item.sex === 0){
                        temp.name = '未选择'
                    }else if(item.sex === 1){
                        temp.name = '女'
                    }else{
                        temp.name = '男'
                    }
                    temp.value = item.count
                    pieData.push(temp);
                    legendData.push(temp.name);
                })
                console.log(pieData)
                console.log(legendData)
                myChart.setOption({
                    title: { 
                        text: '人员男女性别比',
                        textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                            fontFamily: 'Verdana',
                            fontSize: 20,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            color: '#333',
                            left: 'auto',
                            textAligin: 'left'
                            // t
                        }
                    },
                    legend: {
                        data: legendData,
                        // top: '20'
                    },
                    tooltip: {},//数据提示
                    series: {
                        type: 'pie',
                        data: pieData
                    }
                });
                
            }).catch(function (error) {
                console.log(error);
            });

            // var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            
            // var myChart = this.echarts.init(document.getElementById('main'));
            // 绘制图表
            
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
/* .form-item{
    width: 200px
} */
.my-chart{
    width: 60%;
    height: 350px;
    margin: 2% 20%
}
</style>