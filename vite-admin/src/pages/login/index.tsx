import { Input, Form, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import React, { FC } from "react";
import { setStorageState } from "../../utils/storage";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "@/utils/http";

interface FormData {
  username: string;
  password: string;
}

/**
 * @returns
 */
const Panel: FC = function () {
  const navigator = useNavigate();
  const onFinsh = function (form: FormData) {
    const username = form.username;
    const password = md5(form.password);
    axiosApi({
      method: "POST",
      baseURL: "/api/login",
      body: {
        name: username,
        password: password,
      },
    })
      .then((res) => {
        if (!res) return;
        const token = res.data.token;
        setStorageState({ username, password, token, isLogin: "true" });
        console.log("successfull login");
        navigator("/");
      })
      .catch((err) => {
        // TODO: 登录错误处理
        console.log(err);
      });
  };
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
