import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import Order from "../../components/Order";
import Link from "../../components/Link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function OrderConfirmationPage({ cart, totalItems }) {
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
            <BreadcrumbItem>
              <BreadcrumbLink href="/checkout" as={Link}>
                Checkout
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as="span">Review and Pay</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Elements stripe={stripePromise}>
            <Order cart={cart} />
          </Elements>
        </Container>
      </Box>
    </>
  );
}
