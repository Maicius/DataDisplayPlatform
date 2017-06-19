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
		return (
		<div className="general-container">
			<Table>

			</Table>
		</div>
		);
	}
}

export default RenderData({
	id: 'icon', // 应用关联使用的redex
	component: Main // 接收数据的组件入口
});

