import styled from "@emotion/styled";
import login from './icon/login.png'
import { Form, Input, Button } from 'antd';
import { useAuth } from "./context/auth-context";
import { useDocumentTitle } from "./hook/useDocumentTitle";
import dayjs from 'dayjs'
import { rules } from "./utils/verification";
import { useState } from "react";
import { ErrorBox } from "./components/lib";
import { useAsync } from "./hook/useAsync";

export const Login = () => {
  const [error, setError] = useState<Error | null>(null);
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });
  const { login } = useAuth()
  const onFinish = async (values: any) => {
    try {
      await run(login(values))
    } catch (e) {
      setError(e)
    }
  };

  useDocumentTitle('登陆')
  return (
    <LoginStyle>
      <TopTimer>
        <div className="left">{dayjs().format('YYYY-MM-DD')}</div>
        <div className="right">{dayjs().format('HH:mm:ss')}</div>
      </TopTimer>
      <LoginForm>
        <Title>
          5G-NB智慧轨行区数字化维养安全管控系统
        </Title>
        <ErrorBox error={error} />
        <Form
          size={'large'}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="loginName"
            rules={rules}
          >
            <Input size="large" placeholder="账号：请输入您的账号" onChange={() => setError(null)} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={rules}
          >
            <Input.Password size="large" placeholder="密码：请输入您的密码" onChange={() => setError(null)} />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </LoginStyle>
  )
}

const LoginStyle = styled.div`
  min-height: 100vh;
  background-image: url(${login});
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`

const TopTimer = styled.div`
  width: 100%;
  padding: 0 2rem;
  position: absolute;
  top: 4rem;
  font-size: 2rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
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