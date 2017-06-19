import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { is, fromJS } from 'immutable';
import { RenderData } from '../../component/mixin';
import { Icon, Row, Col, Card, Button, Radio, Table } from 'antd';
const ButtonGroup = Button.Group;

// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		userDataSource:[]
    	};
    }
	render() {
    	const columns=[
    		{title:'用户MAC', key:'userMac'},
			{title:'品牌', key:'brand'},
			{title:'信号强度', key:'rssi'},
			{title:'首次出现时间', key: 'first_time'},
			{title:'最近出现时间', key:'recent_time'},
			{title:'出现次数', key: 'times'},
			{title:'探针ID', key: 'probeID'},
			{title:'查看详情', key: 'view'}
		];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

    	return(
    	<div>
			<Bcrumb title="探针数据"/>
			<Table rowSelection={rowSelection} columns={columns} dataSource={this.state.userDataSource}/>

		</div>
		)

	}
}

export default RenderData({
	id: 'button', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

