import styled from "@emotion/styled";
import login from './icon/login.png'
import {Form, Input, Button} from 'antd';
import {useAuth} from "./context/auth-context";
import {useDocumentTitle} from "./hook";

export const UnauthenticatedApp = () => {
  const {login} = useAuth()
  const onFinish = (values: { loginName: string, password: string }) => {
    login(values)
  };
  useDocumentTitle('登陆')
  return (
    <Login>
      <LoginForm>
        <Title>
          5G-NB智慧轨行区数字化维养安全管控系统
        </Title>
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <Form.Item
            name="loginName"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input size="large" placeholder="账号：请输入您的账号"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password size="large" placeholder="密码：请输入您的密码"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{width: "100%"}}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </Login>
  )
}

const Login = styled.div`
  min-height: 100vh;
  background-image: url(${login});
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`

const LoginForm = styled.div`
  width: 40rem;
  height: 40rem;
  margin-left: 60%;
  vertical-align: middle;
`

const Title = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #5A7FFA;
  margin: 5rem 0;
  overflow: hidden;
`