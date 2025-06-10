import React, { useEffect, useState } from 'react';
import { Layout as AntdLayout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    LoginOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    ToolOutlined,
    LogoutOutlined,
    CommentOutlined
} from '@ant-design/icons';
import { accountsService } from '../services/accounts';

const { Header: AntdHeader } = AntdLayout;

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location.pathname);
    const [menuItems, setMenuItems] = useState([]);
    const [role, setRole] = useState(accountsService.getRole());

    useEffect(() => {
        if (location && current !== location.pathname) {
            setCurrent(location.pathname);
        }
    }, [location, current]);

    const handleLogout = async () => {
        await accountsService.logout();
        setRole(null); 
        navigate("/"); 
    };

    useEffect(() => {
        const role = accountsService.getRole();
        setRole(role);

        const items = [
            {
                key: "/",
                label: <Link to="/">Home</Link>,
                icon: <HomeOutlined />,
            },
            {
                key: "/cars",
                label: <Link to="/cars">Cars</Link>,
                icon: <CarOutlined />,
            },
            {
                key: "/reviews",
                label: <Link to="/reviews">Reviews</Link>,
                icon: <CommentOutlined  />,
            },
            {
                key: "/cart",
                label: <Link to="/cart">Cart</Link>,
                icon: <ShoppingCartOutlined />,
            },
        ];

        if (role === "admin") {
            items.push({
                key: "/admin/cars",
                label: <Link to="/admin/cars">Admin panel</Link>,
                icon: <ToolOutlined />,
            });
        }

        if (role) {
            items.push({
                key: "logout",
                label: <span onClick={handleLogout}>Logout</span>,
                icon: <LogoutOutlined />,
            });
        } else {
            items.push({
                key: "/login",
                label: <Link to="/login">Login</Link>,
                icon: <LoginOutlined />,
            });
        }

        setMenuItems(items);
    }, [role]);

    return (
        <AntdHeader style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[current]}
                items={menuItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
        </AntdHeader>
    );
}
