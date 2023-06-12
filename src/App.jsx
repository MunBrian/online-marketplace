import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const stripeReferrer = queryParams.get("stripe_referrer");

  if (location.pathname === "/cancel" && stripeReferrer !== "true") {
    navigate("/home", { replace: true });
    return <Unauthorized />;
  }

  if (location.pathname === "/checkout" && stripeReferrer !== "true") {
    navigate("/home", { replace: true });
    return <Unauthorized />;
  }
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="home" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="/checkout" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
