import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/cart.context';
import { Button, message, Table } from 'antd';
import { ordersService } from '../services/orders';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, cartCount, removeFromCart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const res = await ordersService.create();
            if (res.status === 200) {
                message.success("Замовлення успішно оформлено!");
                clearCart();
                navigate("/orders"); 
            } else {
                message.error("Не вдалося оформити замовлення.");
            }
        } catch (error) {
            console.error(error);
            message.error("Сталася помилка під час оформлення замовлення.");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Марка',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Модель',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Ціна',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
        },
        {
            title: 'Дія',
            key: 'action',
            render: (_, record) => (
                <Button danger onClick={() => removeFromCart(record.id)}>
                    Видалити
                </Button>
            ),
        },
    ];

    return (
        <div className="cart-container p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Кошик ({cartCount})</h2>

            {cartItems.length === 0 ? (
                <p>Ваш кошик порожній</p>
            ) : (
                <>
                    <Table
                        dataSource={cartItems.map(item => ({ ...item, key: item.id }))}
                        columns={columns}
                        pagination={false}
                        bordered
                    />

                    <div className="mt-6 text-center">
                        <Button
                            type="primary"
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            loading={loading}
                        >
                            Оформити замовлення
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
