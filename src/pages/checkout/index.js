import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { commerce } from "../../lib/js/commerce";
import Header from "../../components/Header";
import CheckOutForm from "../../components/CheckOutForm";
import Link from "../../components/Link";

export default function CheckoutPage({ cart, totalItems }) {
  const [checkoutToken, setCheckoutToken] = useState({});

  const generateToken = async (cart) => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cart.id) {
      generateToken(cart);
    }
  }, [cart]);
  return (
    <>
      <Header totalItems={totalItems} />
      <Box as="main">
        <Container maxW={{ lg: "1200px" }} px={[4, 4, 6]}>
          <Breadcrumb
            my={[6, 6, 10]}
            fontSize={["xs", "sm"]}
            spacing="0.5rem"
            borderColor="gray.200"
            px={[4, 5]}
            py={4}
            bgColor="gray.50"
            borderWidth="1px"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/" as={Link}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart" as={Link}>
                Cart
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as="span">Checkout</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <CheckOutForm cart={cart} checkoutToken={checkoutToken} />
        </Container>
      </Box>
    </>
  );
}
