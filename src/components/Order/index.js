import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  AspectRatio,
  Center,
  Divider,
  useBreakpointValue,
  Input,
  FormControl,
  FormLabel,
  Controller,
} from "@chakra-ui/react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import TruncateMarkup from "react-truncate-markup";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker";
import StripeInput from "../Input/StripeInput/StripeInput";
import Link from "../Link";

export default function OrderConfirmation({ cart, router }) {
  console.log(router);
  //stripe hooks
  const stripe = useStripe();
  //stripe hooks
  const elements = useElements();

  const onSubmit = async (data) => {
    // console.log(data);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
      alert("Unexpected error occured!");
    } else {
      console.log("payment", paymentMethod);
    }
  };

  return (
    <Box mb={8}>
      <Heading as="h1" fontWeight={600} fontSize="2xl" mb={4}>
        Review Order
      </Heading>
      <Divider mb={8} borderColor="gray.300" />
      <SimpleGrid
        templateColumns={[
          "1fr",
          "1fr",
          "1fr",
          "minmax(auto, 600px) minmax(350px, 400px)",
        ]}
        justifyContent="space-between"
        columnGap="1.25rem"
      >
        <Box mb={[5, 5, 5, 0]}>
          <Stack direction="column" spacing={5}>
            <Box my={[6, 6, 10]}>
              <Heading fontSize="xl" fontWeight={600} mb={6}>
                Payment Detail
              </Heading>
              <Box borderColor="gray.200" p={[4, 5]} borderWidth="1px">
                <SimpleGrid spacing={5}>
                  <SimpleGrid columns={[1, 2]} spacing={5}>
                    <FormControl>
                      <FormLabel htmlFor="cardName" fontSize="xs">
                        Name on Card
                      </FormLabel>
                      <Input
                        focusBorderColor="black"
                        id="cardName"
                        name="cardName"
                        type="text"
                        variant="outline"
                        autoComplete="off"
                        placeholder="Name on Card"
                        fontSize="sm"
                        size="sm"
                        borderRadius="none"
                        // _focus={{ boxShadow: "0 0 0 1px" }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="cardNumber" fontSize="xs">
                        Card Number
                      </FormLabel>
                      <CardNumberElement
                        onChange={(value) => console.log(value)}
                      />
                      {/* {console.log(errorField.cardNumber)} */}
                      {/* <Controller
                      name="cardNumber"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Field is required" }}
                      render={(props) => {
                        return (
                          <StripeInput
                            as={CardNumberElement}
                            isInvalid={!!errorField.cardNumber}
                            onChange={props.onChange}
                          />
                        );
                      }}
                    /> */}
                      {/* <Controller
                      name="cardNumber"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Field is required" }}
                      render={({ onChange }) => {
                        return (
                          <Input
                            as={NumberFormat}
                            format="#### #### #### ####"
                            onValueChange={(values) => {
                              onChange(values.value);
                            }}
                            id="cardNumber"
                            variant="outline"
                            autoComplete="off"
                            focusBorderColor="black"
                            placeholder="XXXX XXXX XXXX XXXX"
                            fontSize="sm"
                            size="sm"
                            borderRadius="none"
                            // _focus={{ boxShadow: "0 0 0 1px" }}
                          />
                        );
                      }}
                    /> */}
                    </FormControl>
                  </SimpleGrid>
                  <SimpleGrid columns={[1, 2]} spacing={5}>
                    <SimpleGrid columns={2} spacing={5}>
                      {/* <Box>
                        <FormControl>
                          <FormLabel htmlFor="expiration" fontSize="xs">
                            Expiration
                          </FormLabel>

                          <Controller
                            name="expiration"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Field is required" }}
                            render={({ onChange }) => {
                              return (
                                <Input
                                  as={NumberFormat}
                                  format="## / ##"
                                  onValueChange={(values) => {
                                    onChange(values.value);
                                  }}
                                  id="expiration"
                                  variant="outline"
                                  autoComplete="off"
                                  focusBorderColor="black"
                                  placeholder="MM / YY"
                                  fontSize="sm"
                                  size="sm"
                                  borderRadius="none"
                                  // _focus={{ boxShadow: "0 0 0 1px" }}
                                />
                              );
                            }}
                          />
                        </FormControl>
                      </Box> */}
                      {/* <Box>
                        <FormControl>
                          <FormLabel htmlFor="cvv" fontSize="xs">
                            CVV
                          </FormLabel>
                          <Controller
                            name="cvv"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Field is required" }}
                            render={({ onChange }) => {
                              return (
                                <Input
                                  as={NumberFormat}
                                  format="###"
                                  onValueChange={(values) => {
                                    onChange(values.value);
                                  }}
                                  id="cvv"
                                  variant="outline"
                                  autoComplete="off"
                                  focusBorderColor="black"
                                  placeholder="123"
                                  fontSize="sm"
                                  size="sm"
                                  borderRadius="none"
                                  // _focus={{ boxShadow: "0 0 0 1px" }}
                                />
                              );
                            }}
                          />
                        </FormControl>
                      </Box> */}
                    </SimpleGrid>
                  </SimpleGrid>
                </SimpleGrid>
              </Box>
            </Box>
            <Box>
              <Box borderColor="gray.200" borderWidth="1px" p={5}>
                <Stack spacing={3}>
                  <Heading
                    as="h3"
                    fontSize="md"
                    d="flex"
                    alignItems="center"
                    fontWeight={600}
                  >
                    <Box as="span" fontSize="xl" mr={2}>
                      <FaEnvelope />
                    </Box>
                    <Box as="span">Shipping Information</Box>
                  </Heading>
                  <Divider borderColor="gray.300" />
                  <Box>
                    <Text fontSize="xs">Send To:</Text>
                    <Text fontSize={["xs", "sm"]}>Gybriana Chan</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs">Email:</Text>
                    <Text fontSize={["xs", "sm"]}>gybriana321@gmail.com</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs">Phone Number:</Text>
                    <Text fontSize={["xs", "sm"]}>+62 2781123781</Text>
                  </Box>
                  <Divider borderColor="gray.300" />
                  <Box fontSize="xs">
                    <Link href="/checkout">Edit</Link> shipping information
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Box borderColor="gray.200" borderWidth="1px" p={5}>
                <Stack spacing={3}>
                  <Heading
                    as="h3"
                    fontSize="md"
                    d="flex"
                    alignItems="center"
                    fontWeight={600}
                  >
                    <Box as="span" fontSize="xl" mr={2}>
                      <HiLocationMarker />
                    </Box>
                    <Box as="span">Shipping Location</Box>
                  </Heading>
                  <Divider borderColor="gray.300" />
                  <Box>
                    <Text fontSize="xs">Address:</Text>
                    <Text fontSize={["xs", "sm"]}>
                      Jl. Merpati Putih 32 ABC / 31 Perum Tirto Indah,
                      Nanggewer, Jakarta Barat 310292
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs">Building / Room:</Text>
                    <Text fontSize={["xs", "sm"]}>
                      Western Apartment Room 31A
                    </Text>
                  </Box>
                  <Stack direction="row" spacing={3}>
                    <Box flex={1}>
                      <Text fontSize="xs">Country:</Text>
                      <Text fontSize={["xs", "sm"]}>Indonesia</Text>
                    </Box>
                    <Box flex={1}>
                      <Text fontSize="xs">Region:</Text>
                      <Text fontSize={["xs", "sm"]}>Jakarta</Text>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <Box flex={1}>
                      <Text fontSize="xs">City:</Text>
                      <Text fontSize={["xs", "sm"]}>Jakarta Barat</Text>
                    </Box>
                    <Box flex={1}>
                      <Text fontSize="xs">Postal Code:</Text>
                      <Text fontSize={["xs", "sm"]}>310292</Text>
                    </Box>
                  </Stack>
                  <Divider borderColor="gray.300" />
                  <Box fontSize="xs">
                    <Link href="/checkout">Edit</Link> shipping information
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Box borderColor="gray.200" borderWidth="1px" p={5}>
                <Stack spacing={3}>
                  <Heading
                    as="h3"
                    fontSize="md"
                    d="flex"
                    alignItems="center"
                    fontWeight={600}
                  >
                    <Box as="span" fontSize="xl" mr={2}>
                      <FaEnvelope />
                    </Box>
                    <Box as="span">Payment Detail</Box>
                  </Heading>
                  <Divider borderColor="gray.300" />
                  <Box>
                    <Text fontSize="xs">Billed To:</Text>
                    <Text fontSize={["xs", "sm"]}>Gybriana Chan</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs">Card Number:</Text>
                    <Text fontSize={["xs", "sm"]}>**** **** **** 4242</Text>
                  </Box>
                  <Divider borderColor="gray.300" />
                  <Box fontSize="xs">
                    <Link href="/checkout">Edit</Link> payment detail
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Box bgColor="gray.50" p={5}>
            {cart.line_items ? (
              <>
                <Heading fontSize="xl" fontWeight={600}>
                  Order Summary
                </Heading>
                <Divider my={5} borderColor="gray.300" />
                <Stack direction="column" spacing={3}>
                  {cart.line_items.map((item) => (
                    <Box key={item.id}>
                      <Flex
                        bgColor="white"
                        py={[4]}
                        px={[2, 4]}
                        borderRadius="4px"
                      >
                        <Box
                          flex="1"
                          maxWidth={["48px", "60px"]}
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
                          <TruncateMarkup lines={2}>
                            <Text
                              fontSize={["xs", "13px"]}
                              color="gray.900"
                              lineHeight="1rem"
                              mb={1}
                            >
                              {item.name}
                            </Text>
                          </TruncateMarkup>

                          <Text fontSize={["xs", "sm"]} fontWeight="600">
                            Rp. {item.price.raw.toLocaleString()}
                          </Text>
                          <Text
                            fontSize={["xs"]}
                            color="gray.900"
                            lineHeight="1rem"
                            mt={1}
                          >
                            Qty: {item.quantity}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
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
                <Flex mt={2} fontSize={["xs", "sm"]}>
                  <Text>Estimated Shipping : </Text>
                  <Text flex="1" textAlign="right">
                    Rp. 10,000
                  </Text>
                </Flex>
                <Divider my={5} borderColor="gray.300" />
                <Flex mt={2} fontSize={["xs", "sm"]}>
                  <Text>Total : </Text>
                  <Text flex="1" textAlign="right">
                    Rp. 10,000,000
                  </Text>
                </Flex>
                <Flex mt={5}>
                  <Button
                    size={useBreakpointValue(["sm", "sm", "md"])}
                    fontSize={["sm", "sm", "md"]}
                    width="full"
                    type="submit"
                    variant="solid"
                    colorScheme="black"
                    bgColor="black"
                    borderRadius="none"
                  >
                    Order Now
                  </Button>
                </Flex>
              </>
            ) : null}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
