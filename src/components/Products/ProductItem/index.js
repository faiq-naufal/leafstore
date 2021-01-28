import {
  Box,
  Flex,
  Text,
  AspectRatio,
  Heading,
  Button,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react";
import TruncateMarkup from "react-truncate-markup";
import Image from "next/image";

export default function ProductItem({ product, onAddToCart }) {
  return (
    <Flex direction="column" as="li">
      <Flex flex="1" direction="column" borderRadius="8px" overflow="hidden">
        <AspectRatio
          width="full"
          ratio={1 / 1}
          borderRadius="8px"
          overflow="hidden"
          bgColor="gray.100"
        >
          <Center>
            <Image
              layout="fill"
              objectFit="contain"
              src={product.media.source}
              alt={product.name}
            />
          </Center>
        </AspectRatio>
        <Flex
          flex="1"
          direction="column"
          justifyContent="space-between"
          px={1}
          py={[4]}
          bgColor="white"
        >
          <Box>
            <Text as="strong" fontSize={["sm", "md", "lg"]} color="gray.900">
              Rp. {product.price.raw.toLocaleString()}
            </Text>
            <Box mt={1}>
              <TruncateMarkup lines={2}>
                <Heading
                  as="h3"
                  fontSize={["xs", "sm"]}
                  fontWeight={400}
                  color="gray.900"
                  lineHeight={["1rem", "1.25rem"]}
                  mb={1}
                >
                  {product.name}
                </Heading>
              </TruncateMarkup>
            </Box>
          </Box>

          <Box mt={1}>
            <Button
              size={useBreakpointValue(["xs", "sm"])}
              fontSize="xs"
              borderRadius={0}
              _hover={{ backgroundColor: "#000", color: "#fff" }}
              fontWeight="600"
              colorScheme="black"
              variant="outline"
              onClick={() => onAddToCart(product.id, 1)}
            >
              Add to Cart
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
