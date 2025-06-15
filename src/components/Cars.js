import React, { useEffect, useState, useContext } from 'react';
import { Button, message, Space, Card, Row, Col, Select } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { carsService } from '../services/cars';
import { CartContext } from '../contexts/cart.context';
import '../styles/car.css';

const { Option } = Select;

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [totalCars, setTotalCars] = useState(0);
    const [makes, setMakes] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addToCart, isInCart } = useContext(CartContext);
    const [cartStatus, setCartStatus] = useState({});

    const fetchMakesAndCategories = async () => {
        try {
            const [makesRes, categoriesRes] = await Promise.all([
                carsService.getMakes(),
                carsService.getCategories()
            ]);
            setMakes(makesRes.data);
            setCategories(categoriesRes.data.map(cat => cat.name || cat)); 
        } catch (error) {
            console.error("Помилка при завантаженні марок або категорій:", error);
            message.error("Не вдалося завантажити марки або категорії");
        }
    };

    const fetchCars = async () => {
        try {
            const response = await carsService.get({
                page: currentPage,
                pageSize,
                make: selectedMake,
                category: selectedCategory,
                sortDirection,
            });

            const items = response.data.items;
            const total = response.data.totalCount;

            items.forEach(car => {
                if (car.imageUrl && !car.imageUrl.includes('://')) {
                    car.imageUrl = process.env.REACT_APP_API_HOST + car.imageUrl;
                }
            });

            setCars(items);
            setTotalCars(total);

            const status = {};
            for (const car of items) {
                status[car.id] = await isInCart(car.id);
            }
            setCartStatus(status);
        } catch (error) {
            console.error("Помилка при завантаженні авто:", error);
            message.error("Не вдалося завантажити авто");
        }
    };

    useEffect(() => {
        fetchMakesAndCategories();
    }, []);

    useEffect(() => {
        fetchCars();
    }, [currentPage, sortDirection, selectedMake, selectedCategory]);

    const goToNextPage = () => {
        const maxPage = Math.ceil(totalCars / pageSize);
        if (currentPage < maxPage) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDirectionChange = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setCurrentPage(1);
    };

    const handleMakeChange = (value) => {
        setSelectedMake(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const handleBuy = async (car) => {
        try {
            await addToCart(car.id);
            message.success(`${car.make} ${car.model} додано до кошика!`);
            setCartStatus(prev => ({ ...prev, [car.id]: true }));
        } catch (error) {
            console.error("Не вдалося додати в кошик:", error);
            message.error("Не вдалося додати авто до кошика.");
        }
    };

    return (
        <>
            <Space wrap style={{ marginBottom: 16 }}>
                <Button onClick={handleDirectionChange}>
                    {sortDirection === 'asc' ? 'Ціна за зростанням' : 'Ціна за спаданням'}
                </Button>
                <Select
                    placeholder="Фільтр за категорією"
                    onChange={handleCategoryChange}
                    style={{ width: 200 }}
                    allowClear
                    value={selectedCategory}
                >
                    {categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Фільтр за маркою"
                    onChange={handleMakeChange}
                    style={{ width: 200 }}
                    allowClear
                    value={selectedMake}
                >
                    {makes.map(make => (
                        <Option key={make} value={make}>{make}</Option>
                    ))}
                </Select>
            </Space>
            <Row gutter={[16, 16]} className="car-grid">
                {cars.map(car => (
                    <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            className="car-card"
                            cover={<img className="car-image" src={car.imageUrl} alt={`${car.make} ${car.model}`} />}
                            actions={[
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => handleBuy(car)}
                                    disabled={cartStatus[car.id]}
                                >
                                    {cartStatus[car.id] ? 'У кошику' : 'Купити'}
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={`${car.make} ${car.model}`}
                                description={
                                    <>
                                        <p><strong>Рік:</strong> {car.year}</p>
                                        <p><strong>Ціна:</strong> ${car.price}</p>
                                        <p><strong>Пробіг:</strong> {car.mileage}</p>
                                        <p><strong>Двигун:</strong> {car.engine}</p>
                                        <p><strong>Потужність:</strong> {car.horsepower}</p>
                                        <p><strong>Категорія:</strong> {car.categoryName}</p>
                                        <p><strong>Опис:</strong> {car.description}</p>
                                        <p><strong>В наявності:</strong> {car.inStock ? 'Так' : 'Ні'}</p>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Space style={{ marginTop: 20, justifyContent: 'center', width: '100%' }}>
                <Button
                    icon={<LeftOutlined />}
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                />
                <span>Сторінка {currentPage} з {Math.ceil(totalCars / pageSize)}</span>
                <Button
                    icon={<RightOutlined />}
                    onClick={goToNextPage}
                    disabled={currentPage === Math.ceil(totalCars / pageSize)}
                />
            </Space>
        </>
    );
};

export default Cars;
