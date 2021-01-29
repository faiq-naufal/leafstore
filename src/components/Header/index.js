import {
  Heading,
  Box,
  Flex,
  Text,
  Container,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";

import { RiLeafFill } from "@react-icons/all-files/ri/RiLeafFill";
import CartMenu from "../CartMenu";
import Link from "../Link";

export default function Header({ totalItems }) {
  return (
    <Box position="relative" minHeight="3rem">
      <Box
        as="header"
        width="full"
        zIndex={100}
        position="fixed"
        boxShadow="sm"
        background="#000"
      >
        <Box width="full" bg="white" color="black" textAlign="center">
          <p>This site is currently still under development.</p>
        </Box>
        <Container
          maxW={{ lg: "1200px" }}
          px={[4, 4, 6]}
          py={3}
          d="flex"
          justifyContent="space-between"
        >
          <Flex>
            <Link href="/" d="flex" alignItems="center">
              <Heading
                as="h1"
                d="flex"
                alignItems="center"
                fontWeight="600"
                fontSize={["lg", "xl"]}
                color="white"
              >
                <Box as="span" position="relative" top="-2px">
                  <RiLeafFill />
                </Box>
                <Text as="span" color="white" fontWeight={600} ml={2} mr={1}>
                  Leaf
                </Text>
                <Text as="span">Store</Text>
              </Heading>
            </Link>
          </Flex>
          <Flex>
            <Box ml={2}>
              <CartMenu totalItems={totalItems} />
            </Box>

            {/* <Flex alignItems="center" ml={2}>
              <Button
                size="sm"
                fontSize="xs"
                color="white"
                variant="none"
                _hover={{
                  background: "transparent",
                  boxShadow: "0 0 0 0.5px white",
                }}
                onClick={() => auth.signOut()}
              >
                Sign Out
              </Button>
            </Flex> */}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
