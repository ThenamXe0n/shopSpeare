import { Route, Routes } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import Protected from "./routes/Protected";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import MyOrdersPage from "./pages/OrderPage";
import NavBar from "./components/cards/NavBar";
import { verifyUserLoginAsync } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Notiflix from "notiflix";
import ProductPage from "./pages/ProductPage";
import { getAllproductAsync } from "./redux/productSlice";
import { getUserCartItemAsync } from "./redux/cartSlice";
// import { fetchUserCartItemsAsync } from "./redux/CartSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUserLoginAsync());
    dispatch(getUserCartItemAsync());
    dispatch(getAllproductAsync());
  }, []);

  Notiflix.Confirm.init({
    className: "notiflix-confirm",
    width: "300px",
    zindex: 4003,
    position: "center",
    distance: "10px",
    backgroundColor: "#f8f8f8",
    borderRadius: "25px",
    backOverlay: true,
    backOverlayColor: "rgba(0,0,0,0.5)",
    rtl: false,
    fontFamily: "Quicksand",
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: "fade",
    plainText: true,
    titleColor: "black",
    titleFontSize: "16px",
    titleMaxLength: 34,
    messageColor: "#1e1e1e",
    messageFontSize: "14px",
    messageMaxLength: 110,
    buttonsFontSize: "15px",
    buttonsMaxLength: 34,
    okButtonColor: "white",
    okButtonBackground: "black",
    cancelButtonColor: "#f8f8f8",
    cancelButtonBackground: "red",
  });

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/payment-success" element={<div className="h-screen w-screen bg-green flex items-center justify-center text-3xl"><span className="animate-bounce">Payment successfull!!</span></div>} />
        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/order"
          element={
            <Protected>
              <MyOrdersPage />
            </Protected>
          }
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/checkout"
          element={
            <Protected>
              <CheckoutPage />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
