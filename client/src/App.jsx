import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import MobileCategoryNav from './components/MobileCategoryNav';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isShopPage = location.pathname === '/shop';
  const isProductPage = location.pathname.startsWith('/product/');
  const isFullPage = isLandingPage || isAuthPage;

  // Apply light theme only to specific pages as requested by user
  const isLightThemePage = isShopPage || isProductPage;

  return (
    <div className={isLightThemePage ? 'light-theme' : 'dark-theme'}>
      <Header />
      <main className={`${isFullPage ? '' : 'container'} ${isLightThemePage ? 'light-theme' : ''}`} style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/shop' element={<ShopScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart/:id?' element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />

          {/* Admin Routes */}
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
        </Routes>
      </main>
      <Footer />
      <MobileCategoryNav />
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
