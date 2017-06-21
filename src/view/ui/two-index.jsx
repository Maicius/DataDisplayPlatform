import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import { Table, Input, Popconfirm } from 'antd';
import EditableCell from '../../component/mixin/editableCell';
import {Bcrumb} from "../../component/bcrumb/bcrumb";

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
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_name', text),
        }, {
            title: '商场地址',
            dataIndex: 'shop_address',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_address', text),
        },{
        	title:'负责人',
			dataIndex:'shop_manager',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_manager', text),
		},{
            title:'联系方式',
            dataIndex:'shop_telephone',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'shop_telephone', text),
        },{
        	title:'描述',
			dataIndex:'description',
			render: (text, record, index) =>this.renderColumns(this.state.data, index, 'description', text)
		},{
        	title:'查看详情',
			dataIndex:'viewDetail',
            render:(text, record) =>(
				<span><a href="#">查看{record.shop_name}</a></span>)
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
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
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
                    value:'189XXXXXXXXX'
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
        		<Table bordered dataSource={dataSource} columns={columns} />
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