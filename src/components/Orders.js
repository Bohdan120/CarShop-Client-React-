import React, { useEffect, useState } from 'react';
import { ordersService } from '../services/orders';
import { Table, message } from 'antd';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await ordersService.getAllByUser();
                setOrders(res.data);
            } catch (err) {
                message.error("Не вдалося отримати замовлення.");
                console.error(err);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (value) => {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const columns = [
        { title: 'ID замовлення', dataIndex: 'id', key: 'id' },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            render: formatDate,
        },
        {
            title: 'Загальна сума',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `$${price.toFixed(2)}`,
        },
    ];

    const renderProducts = (products) => (
        <ul className="pl-5 list-disc">
            {products.map((p) => (
                <li key={p.id}>
                    {p.make} {p.model} ({p.year}) – ${p.price}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ваші замовлення</h2>
            <Table
                dataSource={orders.map(o => ({ ...o, key: o.id }))}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <>
                            <h4 className="font-semibold mb-2">Автомобілі:</h4>
                            {renderProducts(record.products)}
                        </>
                    ),
                }}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: "Немає замовлень" }}
            />
        </div>
    );
};

export default Orders;
