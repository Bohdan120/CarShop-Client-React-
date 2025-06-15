import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { accountsService } from '../services/accounts';

export default function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Успішно:', values);

        const res = await accountsService.register(values);

        if (res.status !== 200) {
            message.error("Щось пішло не так!");
            return;
        }

        message.success("Ви успішно зареєструвались!");
        navigate('/login');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Помилка:', errorInfo);
    };

    return (
        <>
            <h1 style={center}>Форма реєстрації</h1>
            <Form
                name="register"
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
                            message: 'Введіть вашу електронну пошту!',
                        },
                        {
                            type: 'email',
                            message: 'Неправильний формат електронної пошти!',
                        }
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
                    label="Підтвердження пароля"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Підтвердіть пароль!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Паролі не співпадають!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item style={center}>
                    <Button type="primary" htmlType="submit">
                        Зареєструватися
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}
