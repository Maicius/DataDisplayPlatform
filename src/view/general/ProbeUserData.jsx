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
    		userDataSource:[],
            selectedRowKeys: [],
            loading: false
    	};
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
	render() {
    	const columns=[
            {title:'探针ID', key: 'probeID', dataIndex:'probeID', filters:
				[{text:'00001', value:'00001'},
                    {text:'00002', value:'00002'},
					{text:'00003', value:'00003'},
					{text:'00004', value:'00004'}],
                filterMultiple: true,
                onFilter: (value, record) => record.probeID.indexOf(value) === 0},
			{title:'商场', key:'shop_name', dataIndex:'shop_name'},
    		{title:'用户MAC', key:'userMac', dataIndex:'userMac'},
			{title:'品牌', key:'brand', dataIndex:'brand', filters:
				[{text: 'Apple', value:'Apple'},
					{text:'HUAWEI', value:'HUAWEI'},
					{text:'Xiaomi', value:'Xiaomi'},
					{text:'Meizu', value:'Meizu'},
					{text:'OPPO', value:'GUANGDONG OPPO'},
					{text:'Samsung', value:'Samsung'},
                    {
                        text: 'More',
                        value: 'More',
                        children: [{
                            text: 'IBM',
                            value: 'IBM',
                        }, {
                            text: 'Motorola',
                            value: 'Motorola',
                        },{
                        	text:'Nokia',
							value:'Nokia'
						},{
                        	text:'Microsoft',
							value:'Microsoft'
						},{
                        	text:'Smartisan',
							value:'Smartisan',
						},{
                            text:'Vivo',
                            value:'Vivo',
                        },{
                            text:'AMPAK',
                            value:'AMPAK',
                        },{
                            text:'Smartisan',
                            value:'Smartisan',
                        },{
                            text:'Tenda',
                            value:'Tenda',
                        },{
                            text:'Senient',
                            value:'Senient',
                        }],
                    }],
                filterMultiple: true,
                onFilter: (value, record) => record.brand.indexOf(value) === 0,
                sorter: (a, b) => a.brand.length - b.brand.length,},
			{title:'首次出现时间', key: 'first_time', dataIndex:'first_time', sorter:(a, b) =>a.first_time - b.first_time},
			{title:'最近出现时间', key:'recent_time', dataIndex:'recent_time', sorter:(a, b) =>a.recent_time - b.recent_time},
			{title:'出现次数', key: 'times', dataIndex:'times', sorter: (a, b) => a.times - b.times},
			{title:'查看详情', key: 'view', dataIndex:'view'}
		];
    	const data=[
			{key:1,shop_name:'商业街', userMac:'32:ac:7c:9c:2f:fd', brand:'Apple', first_time:'2017-05-12 09:00:00',
			recent_time:'2017-07-12 10:00:00', times: 5, probeID:'00001', view:'点击查看详情'}
		];
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
    	return(
    	<div>
			<Bcrumb title="探针数据"/>
			<Table rowSelection={rowSelection}
				   bordered
				   columns={columns}
				   expandedRowRender={record => <p>{record.recent_time}</p>}
				   dataSource={data}
			     />
			<Button className="mg-right10"
				type="primary"
				onClick={this.start}
				disabled={!hasSelected}
				loading={loading}
			>
				删除
			</Button>
		</div>
		)

	}
}

export default RenderData({
	id: 'button', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

