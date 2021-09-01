import styled from "@emotion/styled";
import login from './icon/login.png'
import { Form, Input, Button } from 'antd';
import { useAuth } from "./context/auth-context";
import { useDocumentTitle } from "./hook/useDocumentTitle";
import { rules } from "./utils/verification";
import { useState } from "react";
import { ErrorBox } from "./components/lib";
import { useAsync } from "./hook/useAsync";
import { useNavigate } from 'react-router'
export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<Error | null>(null);
  const { isLoading, run, } = useAsync(undefined, { throwOnError: true });
  const { login, menuRender } = useAuth()
  const onFinish = async (values: any) => {
    try {
      await run(login(values)).then(() => {
        run(menuRender())
        navigate("/home")
      })
    } catch (e) {
      setError(e)
    }
  };

  useDocumentTitle('登陆')
  return (
    <LoginStyle>
      {/* <TopTimer>
        <div className="left">{dayjs().format('YYYY-MM-DD')}</div>
        <div className="right">{dayjs().format('HH:mm:ss')}</div>
      </TopTimer> */}
      <div />
      <div>
        <Title>
          <li>智慧轨行区数字化</li>
          <li>维养安全管控系统</li>
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
            getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
          >
            <Input
              style={{ height: "6rem", borderRadius: "10px" }}
              size="large"
              placeholder="账号：请输入您的账号"
              onChange={() => {
                setError(null)
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={rules}
            getValueFromEvent={event => event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, '')}
          >
            <Input.Password style={{ height: "6rem", borderRadius: "10px" }} size="large" placeholder="密码：请输入您的密码"
              onChange={() => setError(null)} />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit"
              style={{ width: "100%", height: "6rem", borderRadius: "10px" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginStyle>
  )
}

const LoginStyle = styled.div`
  min-height: 100vh;
  background: url(${login}) center center no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

/*const TopTimer = styled.div`
  width: 100%;
  padding: 0 2rem;
  position: absolute;
  top: 4rem;
  font-size: 2rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
`*/

const Title = styled.div`
  font-size: 4.8rem;
  font-weight: bold;
  color: #5A7FFA;
  /* margin: 10rem 0 5rem; */
  margin: 5rem 0;
  overflow: hidden;
  text-align: center;
`