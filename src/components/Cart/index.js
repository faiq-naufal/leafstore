import { Box, Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Cart({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  return (
    <Box my={[4, 6, 12]}>
      <Heading fontSize="xl" fontWeight={600} mb={3}>
        Shopping Cart
      </Heading>
      {cart.line_items ? (
        <SimpleGrid
          templateColumns={["1fr", "1fr", "1fr minmax(300px, auto)"]}
          columnGap="1.25rem"
        >
          <Box>
            <Stack direction="column" spacing={5}>
              {cart.line_items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <CartSummary cart={cart} handleEmptyCart={handleEmptyCart} />
          </Box>
        </SimpleGrid>
      ) : null}
    </Box>
  );
}
