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

    // Окремо отримуємо makes та categories при монтуванні
    const fetchMakesAndCategories = async () => {
        try {
            const [makesRes, categoriesRes] = await Promise.all([
                carsService.getMakes(),
                carsService.getCategories()
            ]);
            setMakes(makesRes.data);
            setCategories(categoriesRes.data.map(cat => cat.name || cat)); // залежить від формату
        } catch (error) {
            console.error("Error fetching makes or categories:", error);
            message.error("Failed to load makes or categories");
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

            // Оновлення посилань на зображення
            items.forEach(car => {
                if (car.imageUrl && !car.imageUrl.includes('://')) {
                    car.imageUrl = process.env.REACT_APP_API_HOST + car.imageUrl;
                }
            });

            setCars(items);
            setTotalCars(total);

            // Оновлення статусу в корзині
            const status = {};
            for (const car of items) {
                status[car.id] = await isInCart(car.id);
            }
            setCartStatus(status);
        } catch (error) {
            console.error("Error fetching cars:", error);
            message.error("Failed to load cars");
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
            message.success(`${car.make} ${car.model} added to cart!`);
            setCartStatus(prev => ({ ...prev, [car.id]: true }));
        } catch (error) {
            console.error("Failed to add to cart:", error);
            message.error("Failed to add car to cart.");
        }
    };

    return (
        <>
            <Space wrap style={{ marginBottom: 16 }}>
                <Button onClick={handleDirectionChange}>
                    {sortDirection === 'asc' ? 'Ascending' : 'Descending'} Price
                </Button>
                <Select
                    placeholder="Search by category"
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
                    placeholder="Search by make"
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
                                    {cartStatus[car.id] ? 'In Cart' : 'Buy'}
                                </Button>,
                            ]}
                        >
                            <Card.Meta
                                title={`${car.make} ${car.model}`}
                                description={
                                    <>
                                        <p><strong>Year:</strong> {car.year}</p>
                                        <p><strong>Price:</strong> ${car.price}</p>
                                        <p><strong>Mileage:</strong> {car.mileage}</p>
                                        <p><strong>Engine:</strong> {car.engine}</p>
                                        <p><strong>Horsepower:</strong> {car.horsepower}</p>
                                        <p><strong>Category:</strong> {car.categoryName}</p>
                                        <p><strong>Description:</strong> {car.description}</p>
                                        <p><strong>In Stock:</strong> {car.inStock ? 'Yes' : 'No'}</p>
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
                <span>Page {currentPage} of {Math.ceil(totalCars / pageSize)}</span>
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
