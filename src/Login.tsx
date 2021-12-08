import styled from "@emotion/styled";
import login from "./assets/login/login_bg.png";
import logo from "./assets/login/login_logo.png";
import { Form, Input, Button } from "antd";
import { useAuth } from "./context/auth-context";
import { useDocumentTitle } from "./hook/useDocumentTitle";
import { rules } from "./utils/verification";
import { useState } from "react";
import { ErrorBox } from "./components/lib";
import { useAsync } from "./hook/useAsync";
import { useNavigate } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });
  const { login, menuRender } = useAuth();
  const onFinish = async (values: any) => {
    try {
      await run(login(values)).then(() => {
        run(menuRender());
        navigate("/home");
      });
    } catch (e) {
      // @ts-ignore
      setError(e);
    }
  };

  useDocumentTitle("登陆");
  return (
    <LoginStyle>
      <Logo>
        <img src={logo} alt="" />
      </Logo>
      <LoginForm>
        <Title>
          <li>欢迎使用</li>
          <div>智慧轨行区数字化维养安全管控系统</div>
        </Title>
        <ErrorBox error={error} />
        <Form
          size={"large"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="loginName"
            rules={rules}
            getValueFromEvent={(event) =>
              event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, "")
            }
          >
            <Input
              style={{ height: "50px", borderRadius: "10px" }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="请输入用户名"
              onChange={() => {
                setError(null);
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={rules}
            getValueFromEvent={(event) =>
              event.target.value.replace(/[\u4e00-\u9fa5]|\s+/g, "")
            }
          >
            <Input.Password
              style={{ height: "50px", borderRadius: "10px" }}
              size="large"
              placeholder="请输入密码"
              onChange={() => setError(null)}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "50px", borderRadius: "10px" }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  min-height: 100vh;
  background: url(${login}) center center no-repeat;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  position: absolute;
  color: #fff;
  font-size: 18px;
  left: 40px;
  top: 40px;
`;

const LoginForm = styled.div`
  width: 400px;
  height: 300px;
  margin-left: 350px;
`;

const Title = styled.div`
  font-family: Source Han Sans CN;
  font-size: 30px;
  color: #fff;
  margin: 5rem 0;
  div {
    font-size: 24px;
    margin-top: 20px;
  }
`;
