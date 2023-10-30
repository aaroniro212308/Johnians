import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = "admin";
    const correctPassword = "admin";

    // Check if both the username and password are correct
    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("user", username);
      message.success("Logged in successfully!");
      navigate("/johnians");
    } else {
      // If either the username or password is wrong, display an error message
      message.error("Incorrect username or password!");
    }
  };

  return (
    <>
      <div className="login-page">
        <Card className="card-login">
          <div className="logo-login">
            <div className="logo-icon-login">
              <img src="johnianbr.png" alt="logodd" width="40px" />
            </div>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                className="input-login"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default Login;
