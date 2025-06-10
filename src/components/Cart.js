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
                message.success("Order placed successfully!");
                clearCart();
                navigate("/orders"); 
            } else {
                message.error("Failed to place order.");
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while placing the order.");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button danger onClick={() => removeFromCart(record.id)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div className="cart-container p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart ({cartCount})</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
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
                            Place Order
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
