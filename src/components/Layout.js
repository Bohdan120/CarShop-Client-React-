import React from 'react';
import { Layout as AntdLayout, theme } from 'antd';
import { Outlet, useLocation } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const { Content } = AntdLayout;

export default function Layout() {
    const location = useLocation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <AntdLayout className='Layout'>
            <Header />

            <Content
                className='main'
                style={{
                    padding: '0 48px',
                }}
            >

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        marginTop: 24,
                        borderRadius: borderRadiusLG,
                        maxWidth: isAuthPage ? 480 : '100%', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer />
        </AntdLayout>
    )
}
