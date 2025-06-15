import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { carsService } from '../services/cars';
import { useNavigate, useParams } from 'react-router-dom';

let car = null;

export default function CreateForm() {
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const params = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    const loadCategories = async () => {
        const response = await carsService.getCategories();
        const mapped = response.data.map(x => ({ value: x.id, label: x.name }));
        setCategories(mapped);
    };

    const loadInitialProduct = async () => {
        if (params.id) {
            setEditMode(true);
            const res = await carsService.getById(params.id);
            if (res.status !== 200) return;
            
            car = res.data;
            form.setFieldsValue(car);
        }
    };

    useEffect(() => {
        loadCategories();
        loadInitialProduct();
    }, []);

    const onFinish = async (values) => {
        try {
            if (editMode) {
                values.id = car.id;
                const res = await carsService.edit(values);
                if (res.status === 200) {
                    message.success("Автомобіль успішно відредаговано!");
                }
            } else {           
                const res = await carsService.create(values);
                if (res.status === 200) {
                    message.success("Автомобіль успішно створено!");
                }
            }
        } catch (error) {
            console.error('Помилка при відправленні форми:', error);
        }

        navigate(-1);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Button type='text' onClick={() => navigate(-1)}>
                <ArrowLeftOutlined />
            </Button>

            <h1 style={{ textAlign: "center" }}>
                {editMode ? 'Редагування автомобіля' : 'Створення автомобіля'}
            </h1>

            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600, margin: "auto" }}
                layout="vertical"
            >
                <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                        name="make"
                        label="Марка"
                        rules={[{ required: true, message: 'Введіть марку автомобіля' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <Input placeholder="Введіть марку" />
                    </Form.Item>

                    <Form.Item
                        name="model"
                        label="Модель"
                        rules={[{ required: true, message: 'Введіть модель автомобіля' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <Input placeholder="Введіть модель" />
                    </Form.Item>

                    <Form.Item
                        name="year"
                        label="Рік випуску"
                        rules={[{ required: true, message: 'Введіть рік випуску' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber min={1886} placeholder="Рік випуску" style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <Form.Item
                    name="price"
                    label="Ціна"
                    rules={[{ required: true, message: 'Введіть ціну' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="$"
                        placeholder="Введіть ціну"
                    />
                </Form.Item>

                <Form.Item
                    name="mileage"
                    label="Пробіг (км)"
                    rules={[{ required: true, message: 'Введіть пробіг' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="Введіть пробіг" />
                </Form.Item>

                <Form.Item
                    name="engine"
                    label="Двигун"
                    rules={[{ required: true, message: 'Введіть тип двигуна' }]}
                >
                    <Input placeholder="Наприклад: бензиновий, дизельний" />
                </Form.Item>

                <Form.Item
                    name="horsepower"
                    label="Кінські сили"
                    rules={[{ required: true, message: 'Введіть потужність у кінських силах' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="Введіть потужність" />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Категорія"
                    rules={[{ required: true, message: 'Оберіть категорію' }]}
                >
                    <Select placeholder="Оберіть категорію" options={categories} />
                </Form.Item>

                <Form.Item
                    name="imageUrl"
                    label="Посилання на зображення"
                >
                    <Input placeholder="Введіть URL зображення автомобіля" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Опис"
                    rules={[{ required: true, message: 'Введіть опис автомобіля' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Введіть опис"
                        minLength={10}
                        maxLength={3000}
                        showCount
                    />
                </Form.Item>

                <Form.Item
                    name="inStock"
                    label="Наявність"
                    valuePropName="checked"
                >
                    <Checkbox>Є в наявності</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? 'Зберегти зміни' : 'Створити'}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Очистити
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}
