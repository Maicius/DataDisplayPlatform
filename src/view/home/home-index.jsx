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


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
        this.state = {
             current: 0
        };
    }
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
        let userDiagramDom = echarts.init(document.getElementById('user-diagram'));

        let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a','10a','11a',
            '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'];
        let days = ['Saturday', 'Friday', 'Thursday',
            'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

        let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

        data = data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
        });
        // 绘制图表
        userDiagramDom.setOption( {
            title: {
                text: '用户流量'
            },
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: hours,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: days,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 10,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        });
        window.onresize = function () {
            this.autoResize();
            userDiagramDom.resize();
        }.bind(this);
    }

    drawBounceRate(){
        let bounceRateDom = echarts.init(document.getElementById('bounce-rate'));
        bounceRateDom.setOption({
            backgroundColor: '#2c343c',
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
                    title:{
                        text:'顾客比例'
                    },
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
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
        window.onresize = function () {
            this.autoResize();
            bounceRateDom.resize();
        }.bind(this);
    }

    componentDidMount() {

        this.drawUserDiagram();
        this.drawBounceRate();
        this.autoResize();
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
                    <Col span={12}>
                        <Card title="跳出率" id="bounce-rate"/>
                    </Col>
                    <Col span={12}>
                        <Card title="入店率" id="enter-rate"/>
                    </Col>
                    <Card title="项目上手" className="mg-top20" span={24}>
                        <Steps current={current}>
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content" dangerouslySetInnerHTML={{__html: steps[this.state.current].content}}></div>
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