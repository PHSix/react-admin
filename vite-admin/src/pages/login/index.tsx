import { Input, Form, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { FC, useCallback } from "react";
import { setStorageState } from "../../utils/storage";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "@/utils/http";

interface FormData {
  username: string;
  password: string;
}

/**
 * 登录框
 * @returns
 */
const Panel: FC = function () {
  const navigator = useNavigate();
  const onFinsh = useCallback(function (form: FormData) {
    const username = form.username;
    const password = md5(form.password);
    axiosReq({
      method: "POST",
      url: "/login",
      data: {
        name: username,
        password: password,
      },
    })
      .then((res) => {
        const token = res.data.token;
        setStorageState({
          password,
          username,
          isLogin: "true",
          token: token,
        });
        navigator("/");
        console.log("successfull login");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          message.error("账号密码错误，请重新输入");
        }
      });
  }, []);

  return (
    <section className="w-2/7 bg-white p-4 rounded-md shadow-xl">
      <h1 className="text-xl text-center">LOGIN</h1>
      <Form
        name="login_panel"
        initialValues={{ remember: true }}
        onFinish={onFinsh}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username"></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            placeholder="Password"
            type="password"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

/**
 * 登录页面
 * @returns
 */
export const LoginPage: FC = function () {
  return (
    <main
      className="w-screen min-h-screen bg-cover flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/login-background.jpg')",
      }}
    >
      <Panel></Panel>
    </main>
  );
};
