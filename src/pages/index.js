import { Box, Container } from "@chakra-ui/react";
import Products from "../components/Products";
import Header from "../components/Header";

export default function Home({ products, onAddToCart, totalItems }) {
  return (
    <>
      <Header totalItems={totalItems} />
      <Box as="main" my={12}>
        <Container maxW={{ lg: "1200px" }} px={[4, 4, 6]}>
          <Products products={products} onAddToCart={onAddToCart} />
        </Container>
      </Box>
    </>
  );
}
