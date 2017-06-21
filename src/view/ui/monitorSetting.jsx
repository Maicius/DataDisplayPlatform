/**
 * Created by maicius on 2017/6/21.
 */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import EditableCell from '../../component/mixin/editableCell';
import { Slider, InputNumber, Icon, Row, Col, Card, Button, Radio, Table, Steps, Form, Input } from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            current: 0,
            rangeValue: 1,
            timeValue: 1,
            activityDegree: 1,
            timeSplit: 1,
            selectedRowKeys: [],
        }
    }
    componentDidMount(){}

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    onRangeChange = (value) => {
        this.setState({
            rangeValue: value,
        });
    };
    onTimeChange = (value) =>{
        this.setState({
            timeValue: value,
        });
    };
    onActivityDegree = (value) =>{
        this.setState({
            activityDegree: value
        });
    };

    onTimeSplit = (value) =>{
        this.setState({
            timeSplit: value
        });
    };
    handlePropertySubmit = (e) =>{

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){
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
        const {selectedRowKeys } = this.state;
        const {current} = this.state;
        const shopColumns = [
            {title:'商场ID', dataIndex:'shop_id'},
            {title:'商场名称', dataIndex:'shop_name'},
            {title:'商场地址', dataIndex: 'shop_address'},
            {title:'联系方式', dataIndex:'telephone'},
            {title:'负责人', dataIndex:'manager'},
            {title:'描述', dataIndex:'description'},
            {title:'操作', dataIndex: 'operation', render:(text, record) =>(
                <span><a href="#">编辑{record.name}</a></span>)}
        ];
        const shopData = [
            {key:1, shop_id:1, shop_name:'商业街', shop_address: '四川大学江安校区', telephone:'18030848307',
            manager:'maicius', description:'It\'s a description' }
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
			<div>
				<Bcrumb title="参数设置"/>
				<Row>
					<Col>
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
                        <Col span={24} className="mg-top10">
                            <Table  rowSelection={rowSelection}
                                    columns={shopColumns}
                                    dataSource={shopData}
                                    expandedRowRender={record => <p>{record.description}</p>}>
                                    title = {()=>'商场列表'}
                            </Table>
                        <Form onSubmit={this.handlePropertySubmit}>
                            <div className="mg-top10 mg-left10 ">
                                <FormItem label="入店范围(/米)">
                                    <Col span={18}>
                                        <Slider min={1} max={20} onChange={this.onRangeChange} value={this.state.rangeValue} />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ marginLeft: 16 }}
                                            value={this.state.rangeValue}
                                            onChange={this.onRangeChange}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem label="来访周期(/天)">
                                    <Col span={18}>
                                        <Slider min={1} max={365} onChange={this.onTimeChange} value={this.state.timeValue} />
                                    </Col>
                                    <Col span={4}>
                                    <InputNumber
                                        min={1}
                                        max={365}
                                        style={{ marginLeft: 16 }}
                                        value={this.state.timeValue}
                                        onChange={this.onTimeChange}
                                    />
                                    </Col>
                                </FormItem>

                                <FormItem label="活跃程度">
                                    <Col span={18}>
                                        <Slider min={1} max={20} onChange={this.onActivityDegree} value={this.state.activityDegree} />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ marginLeft: 16 }}
                                            value={this.state.activityDegree}
                                            onChange={this.onActivityDegree}
                                        />
                                    </Col>
                                </FormItem>

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