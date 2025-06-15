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
      const res = await carsService.get({ page: 1, pageSize: 1000 }); 
      const items = res.data.items.map(car => ({
        ...car,
        imageUrl: car.imageUrl.includes('://')
          ? car.imageUrl
          : process.env.REACT_APP_API_HOST + car.imageUrl
      }));
      setCars(items);
    } catch (err) {
      console.error(err);
      message.error('Не вдалося завантажити авто');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await carsService.delete(id);
      message.success('Авто успішно видалено');
      fetchCars();
    } catch (err) {
      console.error(err);
      message.error('Не вдалося видалити авто');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const columns = [
    {
      title: 'Зображення',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (url) => <img src={url} alt="Авто" width={100} />
    },
    {
      title: 'Марка',
      dataIndex: 'make',
      key: 'make'
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value}`
    },
    {
      title: 'Рік',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Категорія',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: 'В наявності',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (value) => (value ? 'Так' : 'Ні')
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, car) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
          />
          <Popconfirm
            title={`Ви впевнені, що хочете видалити ${car.make} ${car.model}?`}
            onConfirm={() => handleDelete(car.id)}
            okText="Так"
            cancelText="Скасувати"
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
        <Title level={3}>Управління Автомобілями</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/cars/create')}>
          Додати нове авто
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
