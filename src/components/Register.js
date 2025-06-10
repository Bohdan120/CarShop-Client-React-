import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { accountsService } from '../services/accounts';

export default function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);

        const res = await accountsService.register(values);

        if (res.status !== 200) {
            message.error("Something went wrong!");
            return;
        }

        message.success("You've registered successfully!");
        navigate('/login');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1 style={center}>Register Form</h1>
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
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
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}
