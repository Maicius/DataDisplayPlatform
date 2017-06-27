import React, { Component, PropTypes } from 'react';
import echarts from 'echarts';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import { Icon, Row, Col, Card, Button, Radio, Table } from 'antd';
let avgDailyUser;
let backColor = '#404a59';
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    drawAvgDailyUsers(){

        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                text: '预测未来一天内流量情况',
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
            xAxis : [
                {   left:'center',
                    top:'center',
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日',
                        '周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四'],
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
                    data:[320, 332, 301, 334, 390, 330, 320]
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
                    data:[120, 132, 101, 134, 90, 230, 210]
                }
            ]
        };
        avgDailyUser.setOption(option);
        window.onresize = function () {
            this.autoResize();
            avgDailyUser.resize();
        }.bind(this);
    }
    componentDidMount(){
        this.autoResize();
        avgDailyUser = echarts.init(document.getElementById('avgDailyUser'));
        this.drawAvgDailyUsers();
	}
    autoResize(){
        let avgDailyUser = document.getElementById('avgDailyUser');
        avgDailyUser.style.height = '80vh';
        avgDailyUser.style.width = '100%';
    }

	render() {
		return (	
		<div className="mg-top10">
            <Row>
			    <Bcrumb title="智能决策"/>
                <Col span={24}>
                    <Card title="avgDailyUser" id="avgDailyUser">

                    </Card>
                </Col>
            </Row>
		</div>
		);
	}
}

Main.contextTypes = {

};

export default RenderData({
	id: 'setting', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});