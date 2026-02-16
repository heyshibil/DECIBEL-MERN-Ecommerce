import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistCartProvider } from "./context/WishlistCartContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { OrderProvider } from "./context/OrdersContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <WishlistCartProvider>
          <SearchProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </SearchProvider>
        </WishlistCartProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </StrictMode>
);

// provided context through <App> to all childs
