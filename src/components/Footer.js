import React from 'react';
import { Layout as AntdLayout } from 'antd';

const { Footer: AntdFooter } = AntdLayout;

export default function Footer() {
    return (
        <AntdFooter
            style={{
                textAlign: 'center',
                backgroundColor: '#001529',
                color: 'white'
            }}
        >
            Автосалон ©{new Date().getFullYear()} Розроблено Богданом
        </AntdFooter>
    );
}
