import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { carsService } from '../services/cars';

const { Title } = Typography;

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await carsService.get({ page: 1, pageSize: 1000 }); // отримати всі авто
      const items = res.data.items.map(car => ({
        ...car,
        imageUrl: car.imageUrl.includes('://')
          ? car.imageUrl
          : process.env.REACT_APP_API_HOST + car.imageUrl
      }));
      setCars(items);
    } catch (err) {
      console.error(err);
      message.error('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await carsService.delete(id);
      message.success('Car deleted successfully');
      fetchCars();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete car');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (url) => <img src={url} alt="car" width={100} />
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make'
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value}`
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (value) => (value ? 'Yes' : 'No')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, car) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
          />
          <Popconfirm
            title={`Are you sure to delete ${car.make} ${car.model}?`}
            onConfirm={() => handleDelete(car.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <Title level={3}>Car Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/cars/create')}>
          Add New Car
        </Button>
      </Space>
      <Table
        rowKey="id"
        dataSource={cars}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};

export default AdminCars;
