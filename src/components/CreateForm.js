import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Space, message, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
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
        console.log(values);
        try {
            if (editMode) {
                values.id = car.id;
                const res = await carsService.edit(values);
    
                if (res.status === 200) {
                    message.success("Car edited successfully!");
                }
            }
            else {           
                const res = await carsService.create(values);
    
                if (res.status === 200) {
                    message.success("Car created successfully!");
                }
            }
    
        } catch (error) {
            console.error('Error submitting form:', error);
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

            <h1 style={{ textAlign: "center" }}>{editMode ? 'Edit' : 'Create'} Car</h1>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "auto"
                }}
                layout="vertical"
            >
                <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                        name="make"
                        label="Make"
                        rules={[{ required: true, message: 'Please enter the car make' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <Input placeholder="Enter car make" />
                    </Form.Item>

                    <Form.Item
                        name="model"
                        label="Model"
                        rules={[{ required: true, message: 'Please enter the car model' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <Input placeholder="Enter car model" />
                    </Form.Item>

                    <Form.Item
                        name="year"
                        label="Year"
                        rules={[{ required: true, message: 'Please enter the car year' }]}
                        style={{ flexGrow: 1 }}
                    >
                        <InputNumber min={1886} placeholder="Enter car year" style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please enter the car price' }]}
                    style={{ flexGrow: 1 }}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="$"
                        placeholder="Enter car price"
                    />
                </Form.Item>

                <Form.Item
                    name="mileage"
                    label="Mileage"
                    rules={[{ required: true, message: 'Please enter the car mileage' }]}
                    style={{ flexGrow: 1 }}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter car mileage"
                    />
                </Form.Item>

                <Form.Item
                    name="engine"
                    label="Engine"
                    rules={[{ required: true, message: 'Please enter the car engine' }]}
                >
                    <Input placeholder="Enter car engine" />
                </Form.Item>

                <Form.Item
                    name="horsepower"
                    label="Horsepower"
                    rules={[{ required: true, message: 'Please enter the car horsepower' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter car horsepower"
                    />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select a car category" options={categories} />
                </Form.Item>
               
                <Form.Item
                    name="imageUrl"
                    label="ImageUrl"                   
                >
                    <Input placeholder="Enter Image URL for car" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <TextArea rows={4} placeholder="Enter car description" minLength={10} maxLength={3000} showCount />
                </Form.Item>

                <Form.Item
                    name="inStock"
                    label="In Stock"
                    valuePropName="checked"
                >
                    <Checkbox>In Stock</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? 'Edit' : 'Create'}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}
