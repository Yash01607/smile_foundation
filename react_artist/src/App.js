import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProducrCreateScreen from './Screens/ProducrCreateScreen';
import AssetListScreen from './Screens/AssetListScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import ProductVariantsList from './Screens/ProductVariantsList';
import ShippingDetailsScreen from './Screens/ShippingDetailsScreen';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ShopScreen from './Screens/ShopScreen';
import OurStoryScreen from './Screens/OurStoryScreen';
import MyWishlistScreen from './Screens/MyWishlistScreen';
import UserInfoScreen from './Screens/UserInfoScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/shop" element={<ShopScreen />}></Route>
            <Route path="/wishlist" element={<MyWishlistScreen />}></Route>
            <Route path="/ourstory" element={<OurStoryScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/userinfo" element={<UserInfoScreen />}></Route>
            <Route
              path="/product/:productid/:productvariantid"
              element={<ProductScreen />}
            ></Route>
            <Route path="/address" element={<ShippingDetailsScreen />}></Route>
            <Route
              path="/productlist/collection/:collectionId/user/:userId"
              element={<ProductListScreen />}
            ></Route>
            <Route path="/assetlist" element={<AssetListScreen />}></Route>
            <Route
              path="/createproduct"
              element={<ProducrCreateScreen />}
            ></Route>
            <Route
              path="/collection/:id"
              element={<ProductVariantsList />}
            ></Route>
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
