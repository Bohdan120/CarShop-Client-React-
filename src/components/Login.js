import React, { useContext } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { accountsService } from '../services/accounts';
import { tokensService } from '../services/tokens';
import { AccountsContext } from '../contexts/account.context';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AccountsContext);

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    const onFinish = async (values) => {
        try {
            const res = await accountsService.login(values);

            if (!res || res.status !== 200 || !res.data?.accessToken) {
                throw new Error("Invalid login response");
            }

            tokensService.save(res.data);

            const tokenData = parseJwt(res.data.accessToken);
            if (!tokenData) {
                throw new Error("Failed to parse access token");
            }

            const role = tokenData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (!role) {
                throw new Error("User role not found in token");
            }

            localStorage.setItem("userRole", role);

            login({
                email: values.email,
                roles: role
            });

            message.success("You're logged in successfully!");
            navigate(-1);
        } catch (error) {
            console.error("Login failed:", error);

            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong during login.";

            message.error(msg);
        }
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1 style={center}>Login Form</h1>
            <Form
                name="basic"
                style={{
                    maxWidth: 400,
                    margin: "auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={center}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Link to="/register">Don't have an account? Register</Link>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}
