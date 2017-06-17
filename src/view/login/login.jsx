import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { RenderData, Config } from '../../component/mixin';

import styles from './style/login.less';

import { Spin, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

/* 以类的方式创建一个组件 */
class Login extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		passwordDirty: false,
    		loginBtnLoading: false,
    		loginBtnText: '登录',
    		loginSpinning: true,
			verifyBtnText:'获取验证码',
    	};
    }
  	handleSubmit = (e) => { // 登录
    	e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
					let username = values.username, // 用户名
							password = values.password, // 密码
                            verifyCode = values.verifyCode,
							loginParams = { // 登录参数
								username: username,
								password: password,
                                verifyCode: verifyCode,
							};
					this.setState({ loginBtnLoading: true, loginBtnText: '登录中...' });
		    	this.props.getData('userLogin.action', loginParams, (res) => {
		    			console.log('res:' + res);
						if(res !== "") {
								Config.localItem(Config.localKey.userToken, (new Date()).getTime()); // 模拟登录成功返回的Token
								this.context.router.push({ 
										pathname: '/home' 
								});
						} else {
								message.error(Config.message.loginError);
								this.setState({ loginBtnLoading: false, loginBtnText: '登录' });
						}
					}, 'userLogin', 'POST');
		    }
	    });
	};
	// 验证用户名
	checkUsername = (rule, value, callback) => {
		const form = this.props.form;
        if (!value) {
            callback();
        } else if (!Config.checkEng(value)) {
	    	callback(Config.message.usernameEng);
	    } else {
	    	callback();
	    }
	};
	// 验证密码
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
	    if (value && this.state.passwordDirty) {
	    	form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	};
	/**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        this.setState({ loginSpinning: false });
    }
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		<div className="login-container">	
			<div className="login-form">
				<Spin tip="载入中..." spinning={this.state.loginSpinning}>
					<div className="login-logo">
				        <img src={Config.logoSrc} />
				        <span>WIFI探针大数据管理平台</span>
				    </div>
					<Form onSubmit={this.handleSubmit}>
				        <FormItem hasFeedback>
				          {getFieldDecorator('username', {
										initialValue: 'maicius',
				            rules: [{ 
											required: true, 
											message: Config.message.usernameInput 
										}, {
				              validator: this.checkUsername
				            }],
				          })(
				            <Input size="large" placeholder="真实手机号" maxLength="12" />
				          )}
				        </FormItem>
				        <FormItem hasFeedback>
				          {getFieldDecorator('password', {
				              initialValue:'110110',
				            rules: [{
				              required: true,
											message: Config.message.passwordInput,
				            }, {
				              validator: this.checkPassword
				            }],
				          })(
				            <Input size="large" type="password" placeholder="密码" maxLength="16" minLength="6"/>
				          )}
				        </FormItem>
                        <FormItem>
                            <div className="verify-code">
                                {getFieldDecorator('verifyCode',{
                                    rules:[{
                                        required: true,
                                        message: Config.message.verifyCodeInput,
                                    }, {
                                        validator: this.checkUsername
                                    }],
                                })(
                                    <Input size="large" type="text" placeholder="点击获取验证码"/>
                                )}
                                <Button type="primary" size="large" >验证码</Button>
                            </div>
                        </FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" size="large" loading={this.state.loginBtnLoading}>{this.state.loginBtnText}</Button>
						</FormItem>
				        <div className="login-account">
				          <span>请使用管理员账户登陆</span>
				        </div>
			        </Form>
		        </Spin>
			</div>
		</div>
		);
	}
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const login = Form.create()(Login);

export default RenderData({
    id: 'login',  //应用关联使用的redux
    component: login //接收数据的组件入口
});