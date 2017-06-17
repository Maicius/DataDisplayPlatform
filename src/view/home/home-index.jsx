import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import echarts from 'echarts';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { RenderData } from '../../component/mixin';

// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import styles from './style/home.less';

import { Icon, Row, Col, Card, Steps, Button, message } from 'antd';
const Step = Steps.Step;
let userDiagramDom;
let enterRate;
let bounceRateDom;

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
             current: 0
        };
    }
    static propTypes = {
        userDiagramData: PropTypes.number.isRequired
    };
    autoResize() {
        let userDiagram = document.getElementById('user-diagram');
        userDiagram.style.width = '100%';
        userDiagram.style.height = '500px';

        let bounceRate = document.getElementById('bounce-rate');
        bounceRate.style.width = '100%';
        bounceRate.style.height = '500px';

        let enterRate = document.getElementById('enter-rate');
        enterRate.style.width = '100%';
        enterRate.style.height = '500px';
    }

    drawUserDiagram(){
        userDiagramDom = echarts.init(document.getElementById('user-diagram'));
        // 绘制图表
        let data=[];
        userDiagramDom.setOption( {
            title: {
                text: '实时流量',
                left: 'center',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: '#404a59',
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.map(function (item) {
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
                startValue: '2017-06-01'
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
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
            series: {
                name: '顾客流量',
                left: 'center',
                type: 'line',
                data: data.map(function (item) {
                    return item[1];
                }),
                markLine: {
                    silent: true,
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
            }
        });
    }

    drawBounceRate(){
        bounceRateDom = echarts.init(document.getElementById('bounce-rate'));
        bounceRateDom.setOption({
            title:{
                text:'顾客比例',
                left: 'center',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: '#404a59',
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
        enterRate = echarts.init(document.getElementById('enter-rate'));
        enterRate.setOption({
            title:{
                text:'入店率',
                left:'center',
                textStyle:{
                    color: '#fff'
                }
            },
            backgroundColor: '#404a59',
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
        window.onresize = function () {
            this.autoResize();
            userDiagramDom.resize();
            enterRate.resize();
            bounceRateDom.resize();
        }.bind(this);

    }
    componentDidMount() {
        this.autoResize();
        this.drawUserDiagram();
        this.drawBounceRate();
        this.drawEnterRate();
    }

    componentWillMount(){

    }

    next() {
        console.log("next");
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
	render() { 
        let linkHtml = '<link href="/antd/dist/app.css" rel="stylesheet" />';
        const steps = [{
          title: '下载',
          content: '<p>$&nbsp;&nbsp;&nbsp;git clone</p><p>$&nbsp;&nbsp;&nbsp;git clone https://github.com/sosout/react-antd.git</p><p>$&nbsp;&nbsp;&nbsp;cd react-antd</p>',
        }, {
          title: '安装',
          content: '<p>// 安装前请先确保已安装node和npm</p><p>// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略</p><p>$&nbsp;&nbsp;&nbsp;npm install webpack -g</p><p>$&nbsp;&nbsp;&nbsp;npm install webpack-dev-server -g</p><p>// 安装成功后,再安装依赖</p><p>$&nbsp;&nbsp;&nbsp;npm install</p>',
        }, {
          title: '运行',
          content: '<p>$&nbsp;&nbsp;&nbsp;npm run dev （正常编译模式，注意：index.html里必须手动引用app.css，{linkHtml}，否则没有样式）</p><p>$&nbsp;&nbsp;&nbsp;npm run hot （热替换编译模式，注意：热替换模式下index.html里去掉引用app.css）</p><p>$&nbsp;&nbsp;&nbsp;npm run dist （发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件）</p>',
        }];
        const current = this.state.current;
		return (
        <div className="home-container">
            <Bcrumb title="实时流量" />
            <Row>
            	<Col span={24}>
                    <Col span={24}>
                        <Card title="用户" id="user-diagram"/>
                    </Col>
                    <Col span={12} className="mg-top10">
                        <Card title="跳出率" id="bounce-rate"/>
                    </Col>
                    <Col span={12} className="mg-top10">
                        <Card title="入店率" id="enter-rate"/>
                    </Col>
                    <Card title="项目上手" className="mg-top20" span={24}>
                        <Steps current={current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content" dangerouslySetInnerHTML={{__html: steps[this.state.current].content}}/>
                        <div className="steps-action">
                          {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>下一步</Button>
                          }
                          {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('恭喜您，大牛!')}>完成</Button>
                          }
                          {
                            this.state.current > 0
                            &&
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                              上一步
                            </Button>
                          }
                        </div>
                    </Card> 
                    <Card title="访问" className="mg-top20">
                        <p>在浏览器地址栏输入http://127.0.0.1:8888</p>
                    </Card> 
                    <Card title="流量" className="mg-top20">
                        <p>此项目是本人空余时间搭建的。希望大家提供宝贵的意见和建议，谢谢。</p>
                    </Card> 
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