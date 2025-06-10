import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Cars from './components/Cars';
import NoPage from './components/NoPage';
import Cart from './components/Cart';
import CreateForm from './components/CreateForm';
import { ConfigProvider } from 'antd';
import Login from './components/Login';
import Register from './components/Register.js';
import AdminCars from './components/AdminCars.js';
import AdminRoute from './components/AdminRoute';
import Reviews from "./components/Reviews";
import Orders from './components/Orders';
import { AccountsProvider } from './contexts/account.context';
import { CartProvider } from './contexts/cart.context';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F4801A',
          borderRadius: '20px',
        },
      }}
    >
      <AccountsProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="cars" element={<Cars />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="orders" element={<Orders />} />
                <Route path="register" element={<Register />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="*" element={<NoPage />} />

                <Route path="admin/cars" element={
                  <AdminRoute>
                    <AdminCars />
                  </AdminRoute>
                } />
                <Route path="admin/cars/create" element={
                  <AdminRoute>
                    <CreateForm />
                  </AdminRoute>
                } />
                <Route path="admin/cars/edit/:id" element={
                  <AdminRoute>
                    <CreateForm />
                  </AdminRoute>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AccountsProvider>
    </ConfigProvider>
  );
};

export default App;
