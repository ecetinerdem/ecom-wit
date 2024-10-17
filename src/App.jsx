
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { Bounce, ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'


function App() {
  

  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        {/* You can define more routes here */}
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
  )
}

export default App
