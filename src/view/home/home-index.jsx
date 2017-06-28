import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import echarts from 'echarts';
import * as ligquid from 'echarts-liquidfill'
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { RenderData } from '../../component/mixin';
import Websocket from 'react-websocket';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import styles from './style/home.less';

import { Icon, Row, Col, Card, Steps, Button, message, Table } from 'antd';
let userDiagramDom;
let enterRate, checkInRatio, deepAccessRatio, jumpRatio;
let bounceRateDom;
let webSocket = null;
let backColor = '#404a59';
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);

        this.state = {
             current: 0,
             userDiagramData: [],
             checkInFlow: [],
             checkInRatio: 0,
             deepAccessRatio: 0,
             jumpRatio:0,
        };
    }


    autoResize() {
        let userDiagram = document.getElementById('user-diagram');
        userDiagram.style.width = '100%';
        userDiagram.style.height = '500px';

        let enterRatio = document.getElementById('enter-ratio');
        enterRatio.style.width = '100%';
        enterRatio.style.height = '300px';


        // let deepAccess = document.getElementById('deep-access-ratio');
        // deepAccess.style.width = '100%';
        // deepAccess.style.height = '300px';


        let JumpRatio = document.getElementById('jump-ratio');
        JumpRatio.style.width = '100%';
        JumpRatio.style.height = '300px';
    }

    handleUserData(data) {
        //let obj = eval('(' + data + ')');
        console.log(data);
        data = JSON.parse(data);
        let newData = [data.time, data.totalFlow];
        this.state.userDiagramData.push(newData);
        this.state.checkInRatio = data.checkInRatio;
        this.state.checkInFlow.push(data.checkInFlow);
        this.state.deepAccessRatio = data.deepVisitRatio;
        this.state.jumpRatio = data.jumpRatio;
        this.setState({ userDiagramData: this.state.userDiagramData,
                        checkInRatio:this.state.checkInRatio,
                        deepAccessRatio: this.state.deepAccessRatio,
                        jumpRatio: this.state.jumpRatio,
                        checkInFlow: this.state.checkInFlow});
        //console.log("userDiagramData:" + userDiagramData);
    }

    drawCheckInRatio(){
        let option = {
            title: {
                text: '入店率',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: backColor,
            series: [{
                type: 'liquidFill',
                radius: '80%',
                data: [this.state.checkInRatio, {
                    value: this.state.checkInRatio-0.1,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                }, {value:this.state.checkInRatio-0.2,
                    direction: 'left',
                    itemStyle:{
                    normal:{
                        color: 'green'
                        }
                    }}, this.state.checkInRatio-0.3]
            }]
        };
        checkInRatio.setOption(option);
    }

    drawDeepAccessRatio(){
        let option = {
            title: {
                text: '深访率',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: backColor,
            series: [{
                type: 'liquidFill',
                radius: '80%',
                data: [{value:this.state.deepAccessRatio,
                        direction: 'right',
                        itemStyle:{
                        normal:{
                            color: 'blue'
                        }
                    }}, {
                    value: this.state.deepAccessRatio-0.1,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                }, {value:this.state.deepAccessRatio-0.2,
                    direction: 'right',
                    itemStyle:{
                        normal:{
                            color: 'blue'
                        }
                    }}, this.state.deepAccessRatio-0.3]
            }]
        };
        deepAccessRatio.setOption(option);
    }

    drawJumpRatio(){
        let option = {
            title: {
                text: '跳出率',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: backColor,
            series: [{
                type: 'liquidFill',
                radius: '80%',
                data: [{value: this.state.jumpRatio,
                        direction: 'left'}, {
                    value: this.state.jumpRatio+0.1,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                }, this.state.jumpRatio-0.3, this.state.jumpRatio-0.4]
            }]
        };
        jumpRatio.setOption(option);
    }

    drawUserDiagram(){
        // 绘制图表
        //console.trace(userDiagramData);
        userDiagramDom.setOption( {
            title: {
                text: '实时流量',
                left: 'left',
                textStyle:{
                    color: '#fff'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                y: 'top',
                data: ['区域流量', '入店流量'],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            backgroundColor: backColor,
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: this.state.userDiagramData.map(function (item) {
                    return item[0];
                }),
                axisLine:{
                    lineStyle:{
                        color: 'white',
                        width: 2
                    }
                }
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        color: 'white',
                        width: 2
                    }
                }
            },
            dataZoom: [{
                startValue: '2017-06-01',
                textStyle: {
                    color: '#8392A5'
                },
                dataBackground: {
                    areaStyle: {
                        color: '#8392A5'
                    },
                    lineStyle: {
                        opacity: 0.8,
                        color: '#8392A5'
                    }
                },
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                textStyle: {
                    color: '#fff'
                },
                pieces: [{
                    gt: 0,
                    lte: 50,
                    color: '#096'
                }, {
                    gt: 50,
                    lte: 100,
                    color: '#ffde33'
                }, {
                    gt: 100,
                    lte: 150,
                    color: '#ff9933'
                }, {
                    gt: 150,
                    lte: 200,
                    color: '#cc0033'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#660099'
                }, {
                    gt: 300,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            series:
                [{
                name: '区域流量',
                left: 'center',
                type: 'line',
                data: this.state.userDiagramData.map(function (item) {
                    return item[1];
                }),
                markLine: {
                    silent: true,
                    label:'区域流量',
                    lineStyle:{
                        normal:{
                            width:3,
                            type: 'dashed'
                        }
                    },
                    data: [{
                        yAxis: 50
                    }, {
                        yAxis: 100
                    }, {
                        yAxis: 150
                    }, {
                        yAxis: 200
                    }, {
                        yAxis: 300
                    }]
                    }
                },{
                    name: '入店流量',
                    left: 'center',
                    type: 'line',

                    data: this.state.checkInFlow,
                    markLine: {
                        silent: true,
                        label:'入店流量',
                        lineStyle:{
                            normal:{
                                width:3,
                                type: 'dashed'
                            }
                        },
                        data: [{
                            yAxis: 50
                        }, {
                            yAxis: 100
                        }, {
                            yAxis: 150
                        }, {
                            yAxis: 200
                        }, {
                            yAxis: 300
                        }]
                    }
                }]

        });
        window.onresize = function () {
            this.autoResize();
            userDiagramDom.resize();
            checkInRatio.resize();
            jumpRatio.resize();
            deepAccessRatio.resize();
        }.bind(this);
    }


    componentDidMount() {
        this.autoResize();
        userDiagramDom = echarts.init(document.getElementById('user-diagram'));
        checkInRatio = echarts.init(document.getElementById('enter-ratio'));
        //deepAccessRatio = echarts.init(document.getElementById('deep-access-ratio'));
        jumpRatio = echarts.init(document.getElementById('jump-ratio'));
        this.drawUserDiagram();
        this.drawCheckInRatio();
        //this.drawDeepAccessRatio();
        this.drawJumpRatio();
        if ('WebSocket' in window) {
            webSocket = new WebSocket("ws://localhost:8080/websocket");
            webSocket.onerror = () =>{
            };
            webSocket.onopen = () =>{
                //alert('WebSocket Open');
            };
            webSocket.onmessage = (data) =>{
                console.log('receive data');
                console.log(data.data);
                this.handleUserData(data.data);
            };
            window.onbeforeunload = function () {
                webSocket.close();
            }
        }
        else {
            alert('当前浏览器 Not support websocket')
        }
    }
    componentDidUpdate() {
        this.drawUserDiagram();
        this.drawCheckInRatio();
        //this.drawDeepAccessRatio();
        this.drawJumpRatio();
    }

	render() {
        const columns = [
            {title:'属性名称', dataIndex:'property-name'},
            {title:'值',dataIndex: 'property-value'}
        ];
        const dataSource = []
		return (
        <div className="home-container mg-top20">
            <Row>
            	<Col span={24}>
                    <Col span={8}>
                        <Card title="入店率" id="enter-ratio"/>
                    </Col>
                    <Col span={8}>
                        <Table label="数据一览表" columns={columns} id="deep-access-ratio" class="uniform-background">

                        </Table>
                    </Col>
                    <Col span={8}>
                        <Card title="跳出率" id="jump-ratio"/>
                    </Col>
                    <Col span={24} className="mg-top20">
                        <Card title="用户" id="user-diagram"/>
                    </Col>
                </Col>
            </Row>
        </div>	
		);
	}
}

export default RenderData({
    id: 'home',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});