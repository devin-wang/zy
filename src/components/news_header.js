import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input
} from 'antd';



import logo from '../images/logo.png';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem =Form.Item;

class NewsHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
      key: 'top',
      username:null,
      userId:null,
      isShow:false
    }
  }

  changeKey = ({item,key})=>{
    this.setState({key})
    if(key==='loginAddRegister'){
      this.setState({
        isShow:true
      });
      this.props.form.resetFields();
    }
  }
  handleShow =(isShow)=>{
    this.setState({isShow})
  }
  handleSubmit=(isRegister,event)=>{
    event.preventDefault();
    let action =isRegister ? 'register' : 'login';
    let{username,password,r_userName,r_password,r_confirmPassword}=this.props.form.getFieldsValue();
  }



  render(){
    let{key,username,userId,isShow}=this.state;
    let {getFieldDecorator}=this.props.form;
    let UserItem=username
      ?(
        <MenuItem className="register" key="userCenter">
          <Button type="primary">{username}</Button>&nbsp;
          <Button type="dashed"><Link to="/user_center">个人中心</Link></Button>&nbsp;
          <Button type="Ghost">退出</Button>&nbsp;
        </MenuItem>
      )
      :(
        <MenuItem className="register" key="loginAddRegister">
          <Icon type="appstore"/>注册/登录
        </MenuItem>
      )
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <div className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </div>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" onClick={this.changeKey} selectedKeys={[key]}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore" />社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {UserItem}
            </Menu>
            <Modal title="用户中心" visible={isShow} okText="关闭"
            onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
              <Tabs onChange={()=>this.props.form.resetFields()}>
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('username')(<Input type="text" placeholder="请输入用户名"/>)
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('password')(<Input type="password" placeholder="请输入密码"/>)
                      }
                    </FormItem>
                    <Button type="primary" httpType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onsubmit={this.handleSubmit.bind(this,false)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('r_userName')(<Input type="text" placeholder="请输入用户名"/>)
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('r_password')(<Input type="password" placeholder="请输入密码"/>)
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder="请再次输入密码"/>)
                      }
                    </FormItem>
                    <Button type="primary">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(NewsHeader);