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
    		{title:'用户MAC', key:'userMac', dataIndex:'userMac'},
			{title:'品牌', key:'brand', dataIndex:'brand'},
			{title:'距离', key:'distance', dataIndex: 'distance'},
			{title:'首次出现时间', key: 'first_time', dataIndex:'first_time'},
			{title:'最近出现时间', key:'recent_time', dataIndex:'recent_time'},
			{title:'出现次数', key: 'times', dataIndex:'times'},
			{title:'探针ID', key: 'probeID', dataIndex:'probeID'},
			{title:'查看详情', key: 'view', dataIndex:'view'}
		];
    	const data=[
			{key:1, userMac:'aa:aa:aa:aa:aa:aa', brand:'Iphone', distance:'100', first_time:'2017-05-12 10:00:00',
			recent_time:'2017-07-12 10:00:00', times: 5, probeID:'00001', view:'点击查看详情'},
            {key:2, userMac:'aa:aa:aa:aa:aa:aa', brand:'Iphone', distance:'100', first_time:'2017-05-12 10:00:00',
                recent_time:'2017-07-12 10:00:00', times: 5, probeID:'00001', view:'点击查看详情'}
		];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

    	return(
    	<div>
			<Bcrumb title="探针数据"/>
			<Table rowSelection={rowSelection}
				   bordered
				   columns={columns}
				   expandedRowRender={record => <p>{record.recent_time}</p>}
				   dataSource={data}
			     />
		</div>
		)

	}
}

export default RenderData({
	id: 'button', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

