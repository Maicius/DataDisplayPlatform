import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import { Table, Input, Popconfirm, Form, Col,Slider, InputNumber, Spin, message, Button, Row } from 'antd';
import EditableCell from '../../component/mixin/editableCell';
import Config from '../../component/mixin/Config';
import {Bcrumb} from "../../component/bcrumb/bcrumb";
import CollectionCreateForm from "../../component/mixin/ShopName"
const FormItem = Form.Item;
/* 以类的方式创建一个组件 */
class Main extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '商场ID',
            dataIndex: 'shop_id',
			width:'10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_id', text),
        }, {
            title: '商场名称',
            dataIndex: 'shop_name',
            width:'10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_name', text),
        }, {
            title: '商场地址',
            dataIndex: 'shop_address',
            width:'10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_address', text),
        },{
        	title:'负责人',
			dataIndex:'shop_manager',
            width:'10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_manager', text),
		},{
            title:'联系方式',
            dataIndex:'shop_telephone',
            width:'10%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_telephone', text),
        },{
        	title:'平均入店率',
			dataIndex:'avg_enter_ratio',
            width:'10%',
            sorter: (a, b) => a.avg_enter_ratio - b.avg_enter_ratio,
			render: (text, record, index) =>this.renderColumns(this.state.data, index, 'avg_enter_ratio', text)
		},{
            title:'平均驻店时长',
            dataIndex:'avg_stay_time',
            width:'10%',
			sorter:(a, b) => a.avg_stay_time - b.avg_stay_time,
            render: (text, record, index) =>this.renderColumns(this.state.data, index, 'avg_stay_time', text)
        },{
            title:'累计入店人次',
            dataIndex:'total_enter_times',
            width:'10%',
			sorter:(a, b) => a.total_enter_times - b.total_enter_times,
            render: (text, record, index) =>this.renderColumns(this.state.data, index, 'total_enter_times', text)
        },{
        	title:'查看详情',
			dataIndex:'viewDetail',
            width:'10%',
            render:(text, record) =>(
				<span><a href="./monitorSetting">查看{record.shop_name}</a></span>)
		}, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].shop_name;
                return (
					<div className="editable-row-operations">
                        {
                            editable ?
								<span>
                  <a onClick={() => this.editDone(index, 'save')}>保存</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                                :
								<span>
                  <a onClick={() => this.edit(index)}>编辑</a>
                </span>
                        }
					</div>
                );
            },
        }];
        this.state = {
            visible: false,
            data: [{
                key: '0',
                shop_id: {
                    value: 1
                },
                shop_name: {
                    editable: false,
                    value: '商业街'
                },
				shop_address:{
                	editable: false,
                	value: '四川大学江安校区'
				},
				shop_manager:{
                	editable: false,
                	value: 'maicius'
				},
                shop_telephone:{
                    editable: false,
                    value:'18996720676'
                },
				avg_enter_ratio:{
                	value: 0.7
				},
				avg_stay_time:{
                	value: 30
				},
				total_enter_times:{
                	value: 	10000
				},
				description:{
                	editable: false,
                	value:'It\'s a descrpition'
				},
				viewDetail:{
                	value:'查看详情',
				},
                operation: {
                    value: '编辑',
                },
            }],
        };
    }
    renderColumns(data, index, key, text) {
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (<EditableCell
			editable={editable}
			value={text}
			onChange={value => this.handleChange(key, index, value)}
			status={status}
		/>);
    }
    handleChange(key, index, value) {
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }
    edit(index) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }
    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (!err) {
                let shop_name = values.shop_name,
                    shop_addr = values.shop_addr,
                    shop_manager = values.shop_manager,
                    shop_telephone = value.shop_telephone,
                    shop_describe = value.shop_describe
                    loginParams = {
                        shop_name: shop_name,
                        shop_addr: shop_addr,
                        shop_manager: shop_manager,
                        shop_telephone: shop_telephone,
                        shop_describe: shop_describe
                    };

                this.props.getData('add_shop.action', loginParams, (res) =>{
                    console.log(res);
                    if(res !== ""){

                    }
                }, 'addShop', 'GET');
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    componentDidMount(){

    }

    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;

        return (
        	<div>
        		<Bcrumb title="商场管理"/>
        		<Table bordered dataSource={dataSource} columns={columns}
					   expandedRowRender={record => <p>{record.description}</p>}/>
                <div>
                    <Button type="primary" onClick={this.showModal}>添加新商场</Button>
                <CollectionCreateForm ref={this.saveFormRef}
                                      visible={this.state.visible}
                                      onCancel={this.handleCancel}
                                      onCreate={this.handleCreate}/>
                </div>
			</div>
		);
    }



}



Main.contextTypes = {
};

export default RenderData({
	id: 'twoui', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});