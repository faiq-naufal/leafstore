import {
  Box,
  Flex,
  Stack,
  Heading,
  Divider,
  Text,
  Button,
  IconButton,
  Center,
  AspectRatio,
} from "@chakra-ui/react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiMinus } from "@react-icons/all-files/fi/FiMinus";
import Image from "next/image";

export default function CartItem({
  item,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) {
  return (
    <Box>
      <Flex bgColor="white" py={[4, 5]} px={[2, 4]} borderRadius="4px">
        <Box
          flex="1"
          maxWidth={["48px", "60px", "80px"]}
          mr={[3, 3, 5]}
          borderRadius="4px"
        >
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
                src={item.media.source}
                alt={item.name}
              />
            </Center>
          </AspectRatio>
        </Box>
        <Box flex="1">
          <Box>
            <Heading
              as="h3"
              fontSize={["xs", "sm"]}
              fontWeight={400}
              color="gray.900"
              lineHeight={["1rem", "1.25rem"]}
              mt={1}
              mb={1}
            >
              {item.name}
            </Heading>
            <Text fontSize={["sm", "md"]} fontWeight="600">
              Rp. {item.price.raw.toLocaleString()}
            </Text>
          </Box>
          <Box mt={1}>
            <Button
              d="flex"
              alignItems="center"
              fontSize="xs"
              color="gray.500"
              variant="none"
              size="xs"
              p={0}
              _hover={{ textDecoration: "underline" }}
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Flex alignItems="center">
          <Stack
            direction="row"
            maxW="320px"
            alignItems="center"
            justifyContent="space-between"
            spacing={[2, 3]}
          >
            <IconButton
              width={["20px", "24px"]}
              minWidth={["20px", "24px"]}
              height={["20px", "24px"]}
              fontSize="xs"
              aria-label="Increase item"
              title="Increase item"
              icon={<FiPlus />}
              variant="outline"
              colorScheme="black"
              onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
            />
            <Text>{item.quantity}</Text>
            <IconButton
              width={["20px", "24px"]}
              minWidth={["20px", "24px"]}
              height={["20px", "24px"]}
              fontSize="xs"
              aria-label="Decrease item"
              title="Decrease item"
              icon={<FiMinus />}
              variant="outline"
              colorScheme="black"
              onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
            />
          </Stack>
        </Flex>
      </Flex>
      <Divider borderColor="gray.300" />
    </Box>
  );
}
