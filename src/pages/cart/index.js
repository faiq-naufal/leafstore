import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import Cart from "../../components/Cart";
import Link from "../../components/Link";

export default function CartPage({
  cart,
  totalItems,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as="span">Cart</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Cart
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            cart={cart}
            handleEmptyCart={handleEmptyCart}
          />
        </Container>
      </Box>
    </>
  );
}
