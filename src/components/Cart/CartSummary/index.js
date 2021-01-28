import { Box, Flex, Text, Heading, Divider, Button } from "@chakra-ui/react";
import Link from "../../Link";

export default function CartSummary({ cart, handleEmptyCart }) {
  return (
    <Box bgColor="gray.50" p={4}>
      <Heading fontSize="xl" fontWeight={600}>
        Summary
      </Heading>
      <Divider my={5} borderColor="gray.300" />
      <Flex fontSize={["xs", "sm"]}>
        <Text>Number of Items : </Text>
        <Text flex="1" textAlign="right">
          {cart.total_items} items
        </Text>
      </Flex>
      <Flex mt={2} fontSize={["xs", "sm"]}>
        <Text>Subtotal : </Text>
        <Text flex="1" textAlign="right">
          Rp. {cart.subtotal.raw.toLocaleString()}
        </Text>
      </Flex>
      <Divider my={5} borderColor="gray.300" />
      <Flex mt={5} justifyContent="space-between">
        <Button
          size="sm"
          bgColor="white"
          variant="outline"
          colorScheme="black"
          borderRadius="none"
          d="flex"
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
        <Button
          as={Link}
          href="/checkout"
          size="sm"
          variant="solid"
          colorScheme="black"
          bgColor="black"
          borderRadius="none"
        >
          Checkout
        </Button>
      </Flex>
    </Box>
  );
}
