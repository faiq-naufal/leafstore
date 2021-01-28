import { SimpleGrid } from "@chakra-ui/react";
import ProductItem from "./ProductItem";

export default function Products({ products, onAddToCart }) {
  return (
    <SimpleGrid
      templateColumns={[
        "repeat(2, minmax(130px, 1fr))",
        "repeat(auto-fit, minmax(200px, 1fr))",
      ]}
      as="ul"
      columnGap={[3, 5]}
      rowGap={[5]}
      listStyleType="none"
    >
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </SimpleGrid>
  );
}
