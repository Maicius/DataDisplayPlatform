/**
 * Created by maicius on 2017/6/21.
 */
import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {RenderData} from '../../component/mixin';
import {Bcrumb} from "../../component/bcrumb/bcrumb";

import EditableCell from '../../component/mixin/editableCell';
import {Slider, InputNumber, Row, Col, Card, Button, Radio, Table, Steps, Form, Input} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            rangeValue: 1,
            timeValue: 1,
            activityDegree: 1,
            timeSplit: 1,
            selectedRowKeys: [],
            setBtnLoading:false,
            setBtnText: '提交',
            shop_names: [{"id":'1',"name":'商业街'}, {"id":'2',"name":'二基楼'}, {"id":'3',"name":'法学院'}]
        }
    }

    componentDidMount() {
        this.getShopNames();
    }

    getShopNames(){
        let userName = localStorage.getItem("USERNAME"),
        loginParams = {
            userName: userName
        };
        this.props.getData('queryShopInfos.action', loginParams, (res) => {
            console.log(res);
            if(res !== ""){
                this.state.shop_names = res;
                this.setState({shop_names: this.state.shop_names});
            }
        })
    }

    getProbeInfo = (value) =>{
        console.log(value.target.value);
        let userName = localStorage.getItem("USERNAME"),
            shop_id = value.target.value,
            loginParams = {
                userName: userName,
                shopId: shop_id
            };
        this.props.getData('queryProbeInfos.action', loginParams, (res) => {
            console.log(res);
            if(res !== ""){
                this.state.rangeValue = res.rangeValue;
                this.state.timeValue = res.rangeValue;
                this.state.activityDegree = res.activityDegree;
                this.state.timeSplit = res.timeSplit;
                this.setState({
                    rangeValue: this.state.rangeValue,
                    timeValue: this.state.timeValue,
                    activityDegree: this.state.activityDegree,
                    timeSplit: this.state.timeSplit
                })
            }
        });

    };

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    onRangeChange = (value) => {
        this.setState({
            rangeValue: value,
        });
    };
    onTimeChange = (value) => {
        this.setState({
            timeValue: value,
        });
    };
    onActivityDegree = (value) => {
        this.setState({
            activityDegree: value
        });
    };

    onTimeSplit = (value) => {
        this.setState({
            timeSplit: value
        });
    };
    handlePropertySubmit = (err, values) => {

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});

    }


    render() {
        const steps = [{
            title: '选择商场名称',
            content: '<p>$&nbsp;&nbsp;&nbsp;想查看商场详情请点击<a href="#">移步</a><br></p><p>$&nbsp;&nbsp;&nbsp;点击商场后会出现对应的探针设备</p>',
        }, {
            title: '选择探针设备',
            content: '<p>$&nbsp;&nbsp;&nbsp;请确保所有探针已联网</p><p>$&nbsp;&nbsp;&nbsp;勾选需要修改参数的探针</p>',
        }, {
            title: '参数详解',
            content: '<p>$&nbsp;&nbsp;&nbsp;入店范围:当距离小于该值时判断为进店</p>' +
            '           <p>$&nbsp;&nbsp;&nbsp;来访周期:当顾客两次访问时间大于该值时判断为老顾客</p>' +
            '             <p>$&nbsp;&nbsp;&nbsp;活跃程度:当顾客到店次数大于该值时判断为活跃顾客</p>'+
            '             <p>$&nbsp;&nbsp;&nbsp;深访时间:当顾客停留时间大于该值时判断为深度访问</p>'
        }];
        const {selectedRowKeys} = this.state;
        const {current} = this.state;
        const shopColumns = [
            {title: '探针ID', dataIndex: 'probe_id'},
            {title: '位置', dataIndex: 'address'},
            {title: '开机时间', dataIndex: 'start_time'},
            {title: '累计工作时长(/h)', dataIndex: 'work_time'},
            {title: '发送频率(/每秒)', dataIndex: 'rate'},
            {title: '工作状态', dataIndex: 'work_state'},
            {title: '累计发送数据', dataIndex: 'total_data'}
        ];
        const shopData = [
            {
                key: 1, probe_id: 1, address: '商业街', start_time: '2017-01-01 00:00:00', work_time: 30,
                rate: 3, work_state: '良好', total_data: 100000
            }
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Bcrumb title="参数设置"/>
                <Row>
                    <Col>
                        <Card title="探针参数设置" span={24} className="mg-left10">
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title}/>)}
                            </Steps>
                            <div className="steps-content"
                                 dangerouslySetInnerHTML={{__html: steps[this.state.current].content}}/>
                            <div className="steps-action">
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => message.success("谢谢使用")}>完成</Button>
                                }
                                {
                                    this.state.current > 0
                                    &&
                                    <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                                        上一步
                                    </Button>
                                }
                            </div>
                        </Card>
                        <Col span={24} className="mg-top10">
                            <div className="mg-left10 mg-top10">
                                <RadioGroup defaultValue='a' size="large" onChange={this.getProbeInfo}>
                                    {this.state.shop_names.map((shop)=>
                                        <RadioButton  value={shop.shop_id}>{shop.shop_name}</RadioButton>)}
                                </RadioGroup>
                            </div>
                            <Form onSubmit={this.handlePropertySubmit}>
                                <div className="mg-top10 mg-left10 ">
                                    <Table rowSelection={rowSelection}
                                           columns={shopColumns}
                                           dataSource={shopData}
                                           title={() => '探针列表'}/>
                                    <Col span={12} className="propertyForm">
                                        <FormItem label="入店范围(/米)">
                                            <Col span={18}>
                                                <Slider min={1} max={20} onChange={this.onRangeChange}
                                                        value={this.state.rangeValue}/>
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={20}
                                                    style={{marginLeft: 16}}
                                                    value={this.state.rangeValue}
                                                    onChange={this.onRangeChange}
                                                />
                                            </Col>
                                        </FormItem>
                                        <FormItem label="来访周期(/天)">
                                            <Col span={18}>
                                                <Slider min={1} max={365} onChange={this.onTimeChange}
                                                        value={this.state.timeValue}/>
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={365}
                                                    style={{marginLeft: 16}}
                                                    value={this.state.timeValue}
                                                    onChange={this.onTimeChange}
                                                />
                                            </Col>
                                        </FormItem>

                                        <FormItem label="活跃程度(/次)">
                                            <Col span={18}>
                                                <Slider min={1} max={20} onChange={this.onActivityDegree}
                                                        value={this.state.activityDegree}/>
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={20}
                                                    style={{marginLeft: 16}}
                                                    value={this.state.activityDegree}
                                                    onChange={this.onActivityDegree}
                                                />
                                            </Col>
                                        </FormItem>

                                        <FormItem label="深访时间(/分钟)">
                                            <Col span={18}>
                                                <Slider min={1} max={20} onChange={this.onTimeSplit}
                                                        value={this.state.timeSplit}/>
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={20}
                                                    style={{marginLeft: 16}}
                                                    value={this.state.timeSplit}
                                                    onChange={this.onTimeSplit}
                                                />
                                            </Col>
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" size="large" loading={this.state.setBtnLoading}>{this.state.setBtnText}</Button>
                                        </FormItem>
                                    </Col>
                                </div>
                            </Form>
                        </Col>
                    </Col>
                </Row>

            </div>
        )

    }

}
export default RenderData({
    id: 'monitorSetting', // 应用关联使用的redex
    component: Main // 接收数据的组件入口
});