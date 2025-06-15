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
                throw new Error("Неправильна відповідь при вході");
            }

            tokensService.save(res.data);

            const tokenData = parseJwt(res.data.accessToken);
            if (!tokenData) {
                throw new Error("Не вдалося розібрати access token");
            }

            const role = tokenData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (!role) {
                throw new Error("Роль користувача не знайдена в токені");
            }

            localStorage.setItem("userRole", role);

            login({
                email: values.email,
                roles: role
            });

            message.success("Ви успішно увійшли!");
            navigate(-1);
        } catch (error) {
            console.error("Помилка входу:", error);

            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Щось пішло не так під час входу.";

            message.error(msg);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Помилка при надсиланні форми:', errorInfo);
    };

    return (
        <>
            <h1 style={center}>Форма входу</h1>
            <Form
                name="login-form"
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
                    label="Електронна пошта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть електронну пошту!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введіть пароль!',
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
                    <Checkbox>Запам'ятати мене</Checkbox>
                </Form.Item>

                <Form.Item style={center}>
                    <Button type="primary" htmlType="submit">
                        Увійти
                    </Button>
                </Form.Item>

                <Form.Item style={center}>
                    <Link to="/register">Не маєте облікового запису? Зареєструватися</Link>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
};
