import {useContext} from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {Navbar, Container, Nav, Badge, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Store} from './Store'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

export default function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {cart, userInfo} = state

  const signoutHandler = () => {
    ctxDispatch({
      type: 'USER_SIGNOUT',
    })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-containter">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign in
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
