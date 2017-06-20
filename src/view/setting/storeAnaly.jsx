import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import { Icon, Row, Col, Card, Button, Radio, Table } from 'antd';
let bounceRateDom, enterRate;
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    componentDidMount(){
        bounceRateDom = echarts.init(document.getElementById('bounce-rate'));
        enterRate = echarts.init(document.getElementById('enter-rate'));
	}
    drawBounceRate(){
        bounceRateDom.setOption({
            title:{
                text:'顾客比例',
                left: 'center',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: backColor,
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
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ],
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#1f8bc2',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }

    drawEnterRate(){
        enterRate.setOption({
                title:{
                    text:'入店率',
                    left:'center',
                    textStyle:{
                        color: '#fff'
                    }
                },
                backgroundColor: backColor,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直达', selected:true},
                            {value:679, name:'营销广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],

                        data:[
                            {value:335, name:'直达'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1048, name:'百度'},
                            {value:251, name:'谷歌'},
                            {value:147, name:'必应'},
                            {value:102, name:'其他'}
                        ]
                    }
                ]
            }
        );


    }

	render() {
		return (	
		<div className="mg-top10">
            <Row>
			    <Bcrumb title="店铺分析"/>
                <Col span={24}>
                    <Card title="顾客比例">

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