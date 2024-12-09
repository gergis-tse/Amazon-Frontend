import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Landing from "./src/Pages/Landing/Landing"

import Payment from "./src/Pages/Payments/Payment"
import Orders from "./src/Pages/Orders/Order"
import Cart from "./src/Pages/Cart/Cart"
import Results from "./src/Pages/Results/Results"
import ProductDetail from "./src/Pages/ProductDetail/ProductDetail"
import Auth from "./src/Pages/Auth/AUth"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./src/Components/ProtectedRoutes/ProtectedRoute"
const stripePromise = loadStripe(
  "pk_test_51QQEV5A0UyGylINRy4D9CuNvfqSkvaX2eOHM8s5Gl42WlEss4x7QYIW8TiTJF5ZMRgaUaeNK5Nhdgrpk4E5qu78b00RhmNk7kI"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must log in to access your order"}
              redirect={"/orders"}
            >
              
                <Orders />
             
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default Routing
