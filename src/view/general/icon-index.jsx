import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import { Icon, Row, Col, Card, Button, Radio, Table } from 'antd';
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
	render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            filters: [{
                text: 'Joe',
                value: 'Joe',
            }, {
                text: 'Jim',
                value: 'Jim',
            }, {
                text: 'Submenu',
                value: 'Submenu',
                children: [{
                    text: 'Green',
                    value: 'Green',
                }, {
                    text: 'Black',
                    value: 'Black',
                }],
            }],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        }, {
            title: 'Address',
            dataIndex: 'address',
            filters: [{
                text: 'London',
                value: 'London',
            }, {
                text: 'New York',
                value: 'New York',
            }],
            filterMultiple: false,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.address.length - b.address.length,
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }, {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        }];

        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }
		return (
        <Table columns={columns} dataSource={data} onChange={onChange} />


    );
	}
}

export default RenderData({
	id: 'icon', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

