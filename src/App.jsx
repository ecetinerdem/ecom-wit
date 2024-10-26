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

function App() {
  useAutoLogin();

  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/shop/:gender/:category" component={ShopPage} />
          <Route path="/shop" exact component={ShopPage} />
          <Route path="/shop/:gender/:category/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LogInPage} />
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