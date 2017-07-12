import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import { Icon, Row, Col, Card, Button, Radio, Table, DatePicker} from 'antd';
import moment from 'moment';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import echarts from 'echarts';
/* 以类的方式创建一个组件 */

let echartDom, customRatio, stayTime, monthlyFlow, dailyUser;
let backColor = '#404a59';
let data;
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            loading: false,
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    autoResize(){
        let dom = document.getElementById('CalendarView');
        dom.style.width='100%';
        dom.style.height='400px';

        dom= document.getElementById('customRatio');
        dom.style.width='100%';
        dom.style.height='400px';

        dom= document.getElementById('stayTime');
        dom.style.width='100%';
        dom.style.height='400px';

        dom= document.getElementById('monthlyFlow');
        dom.style.width='100%';
        dom.style.height='400px';

        dom= document.getElementById('dailyUser');
        dom.style.width='100%';
        dom.style.height='400px';

    }

    getVirtulData(year) {

        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
                data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
            }
        return data;
    }

    drawCustomerRatio(){
        let option = {
            backgroundColor: backColor,
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            title: {
                text: '手机品牌',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'手机品牌',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'华为'},
                        {value:310, name:'小米'},
                        {value:274, name:'OPPO'},
                        {value:235, name:'IPHONE'},
                        {value:400, name:'其它'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'area',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00BFFF',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        customRatio.setOption(option);
    }

    drawDataView(){
        const mgLeft = 100;
        const mgTop = 10;
        data = this.getVirtulData(2016);
        //console.log(data);
        let option = {
            backgroundColor: backColor,
            title: {
                text: '用户活跃年历',
                left:'center',
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                left:'left',
                show: true,
                data:['步数', 'Top 12'],
                textStyle: {
                    color: '#fff'
                }
            },
            calendar: [{
                top: 'center',
                left: 'center',
                range: ['2016-01-01', '2016-12-31'],
                monthLabel: {
                    nameMap: 'cn',
                    textStyle:{
                        color:'#fff'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                yearLabel: {
                    formatter: '{start}',
                    textStyle: {
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }],
            series : [
                {
                    name: '人流量（/人次）',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: data,
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    itemStyle: {
                        normal: {
                            color: '#00BFFF'
                        }
                    }
                },
                {
                    name: 'Top 12',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 12),
                    symbolSize: function (val) {
                        return val[1] / 500;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };

        echartDom.setOption(option);
        window.onresize = function () {
            this.autoResize();
            echartDom.resize();
        }.bind(this);
    }

    drawDailyUsers(){

        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                text: '用户活跃时间',
                left:'center',
                textStyle: {
                    color: '#fff'
                }
            },
            backgroundColor:backColor,

            legend: {
                data:['客流量','入店量'],
                left:'left',
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis : [
                {   left:'center',
                    top:'center',
                    type : 'category',
                    data : ['00：00','01：00','02：00','03：00','04：00','05：00','06：00','07：00','08：00','09：00','10：00','11：00','12：00','13：00',
                        '14：00','15：00','16：00','17：00','18：00','19：00','20：00','21：00','2：00','23：00','24：00'],
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    label:{
                        normal:{
                            show: true,
                            position:'inside'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#00BFFF'}
                                ]
                            )
                        }
                    },
                    name:'客流量',
                    type:'bar',
                    data:[123, 123, 301, 334, 390, 330, 320,320, 332, 201, 444, 312, 331, 310,280, 360, 301, 200, 199, 160, 100,80, 99, 56,40]
                },
                {
                    label:{
                        normal:{
                            show: true,
                            position:'inside'
                        }
                    },
                    name:'入店量',
                    type:'bar',
                    stack: '广告',
                    data:[20, 132, 101, 134, 90, 230, 200,120, 132, 111, 134, 90, 230, 210,120, 132, 101, 134, 90, 140, 110, 90, 23,45, 12]
                }
            ]
        };
        dailyUser.setOption(option);
    }

    drawStayTime(){
        let option = {
            backgroundColor: backColor,

            title: {
                text: '来访顾客平均时长占比',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#fff'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问时长',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'大于3 hour'},
                        {value:310, name:'1 hour -- 3 hour'},
                        {value:274, name:'30 min--1 hour'},
                        {value:235, name:'10 min--30 min'},
                        {value:400, name:'小于 10 min'}
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        show:true,
                        position:'inside',
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00BFFF',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        stayTime.setOption(option);
    }

    drawMonthlyFlow(){
        var dataAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        var yMax = 500;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        let option = {
            title: {
                text: '平均每月人流量',
                left: 'center',
                textStyle:{
                    color:'#fff'
                }
            },
            backgroundColor:backColor,
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: dataShadow,
                    animation: false
                },
                {
                    type: 'bar',
                    label:{
                        normal:{
                            show: true,
                            position:'inside'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#00BFFF'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#00BFFF'}
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        };
        monthlyFlow.setOption(option);
        // Enable data zoom when user click bar.
        var zoomSize = 6;
        monthlyFlow.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            monthlyFlow.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });
    }

    componentDidMount(){
        this.autoResize();
        echartDom = echarts.init(document.getElementById('CalendarView'));
        customRatio = echarts.init(document.getElementById('customRatio'));
        stayTime = echarts.init(document.getElementById('stayTime'));
        monthlyFlow = echarts.init(document.getElementById('monthlyFlow'));
        dailyUser = echarts.init(document.getElementById('dailyUser'));
        this.drawDataView();
        this.drawCustomerRatio();
        this.drawStayTime();
        this.drawMonthlyFlow();
        this.drawDailyUsers();
    }

    componentDidUpdate(){

    }

	render() {
        const columns=[
            {title:'开始时间', dataIndex:'start_time'},
            {title:'截止时间', dataIndex:'end_time'}
        ];
        const { MonthPicker, RangePicker } = DatePicker;
        const dateFormat = 'YYYY/MM/DD';
        const monthFormat = 'YYYY/MM';
		return(
            <div>
                <Row>
                    <Bcrumb title="数据一览"/>
                    <Col span={4}>
                        <div className="mg-left10">
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                            <Table columns={columns} className="mg-top20"/>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Card title="日历数据" id="CalendarView" className="mg-left10"/>
                    </Col>

                    <Col span={4}>
                        <div className="mg-left10">
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                            <Table columns={columns} className="mg-top20"/>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Card title="月人流量" id="monthlyFlow" className="mg-left10"/>
                    </Col>

                    <Col span={4}>
                        <div className="mg-left10">
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                            <Table columns={columns} className="mg-top20"/>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Card title="每日活跃日志" id="dailyUser" className="mg-left10"/>
                    </Col>

                    <Col span={4}>
                        <div className="mg-left10">
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                            <Table columns={columns} className="mg-top20"/>
                        </div>
                    </Col>
                    <Col span={10}>
                        <Card title="顾客比例" id="customRatio" className="mg-left10"/>
                    </Col>
                    <Col span={10}>
                        <Card title="驻留时长" id="stayTime"/>
                    </Col>
                </Row>
            </div>
        );

	}
}

export default RenderData({
	id: 'icon', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

