import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import useAutoLogin from './hooks/useAutoLogin';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ShipmentPage from './pages/ShipmentPage';
import PaymentPage from './pages/PaymentPage';
import OrderCompletePage from './pages/OrderCompletePage';
import PrivateRoute from './components/PrivateRoute';
import OrderHistoryPage from './pages/OrderHistoryPage';


function App() {
  useAutoLogin();

  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
          {/* Product detail route should come BEFORE the category route */}
          <Route path="/shop/:gender/:category/:productNameSlug/:productId" component={ProductDetailPage} />
          <Route path="/shop/:gender/:category" component={ShopPage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
          <PrivateRoute path="/cart" component={ShoppingCartPage} />
          <PrivateRoute path="/shipment" component={ShipmentPage} />
          <PrivateRoute path="/payment" component={PaymentPage} />
          <PrivateRoute path="/order-complete" component={OrderCompletePage} />
          <PrivateRoute path="/order-history" component={OrderHistoryPage} />
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </>
    </Router>
  );
}

export default App;