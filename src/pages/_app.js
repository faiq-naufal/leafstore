import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import NProgress from "nprogress";
import Theme from "../components/Theme";
import "../lib/css/nprogress.css";
import { commerce } from "../lib/js/commerce";

const setDocHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [URL, setURL] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarts = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch (error) {
      console.log(error);
      handleEmptyCart();
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.update(productId, { quantity });
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCarts();
  }, []);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    window.addEventListener("resize", setDocHeight, true);
    window.addEventListener("orientationchange", setDocHeight, true);
    setDocHeight();

    const origin = window.location.origin;
    const fullURL = window.location.href;

    setURL({ origin, fullURL });

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);

      window.removeEventListener("resize", setDocHeight, true);
      window.removeEventListener("orientationchange", setDocHeight, true);
    };
  }, []);

  return (
    <Theme>
      <Component
        totalItems={cart.total_items}
        products={products}
        cart={cart}
        onAddToCart={handleAddToCart}
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveFromCart={handleRemoveFromCart}
        handleEmptyCart={handleEmptyCart}
        {...pageProps}
      />
    </Theme>
  );
}

export default MyApp;
