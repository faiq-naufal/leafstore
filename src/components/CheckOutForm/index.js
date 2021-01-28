import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  Stack,
  AspectRatio,
  Center,
  Input,
  Select,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import Image from "next/image";
import TruncateMarkup from "react-truncate-markup";
import { commerce } from "../../lib/js/commerce";

export default function CheckOutForm({ cart, checkoutToken }) {
  const {
    register,
    handleSubmit,
    watch,
    errors: errorField,
    control,
    setValue,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const shippingCountry = data.shippingCountry.split("-")[1];
    const shippingRegion = data.shippingRegion.split("-")[1];
    const shippingCost = data.shippingOption.split("-")[1];

    const formData = {
      ...data,
      shippingCountry,
      shippingRegion,
      shippingCost,
    };

    router.push({
      pathname: "/order",
      query: { data: JSON.stringify(formData) },
    });
  };

  //list of each available countries, regions, and options from commerce.js dashboard
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingRegions, setShippingRegions] = useState([]);
  const [shippingOptionsList, setShippingOptionsList] = useState([]);

  //value of select fields
  const { shippingCountry, shippingRegion, shippingOption } = watch(
    ["shippingCountry", "shippingRegion", "shippingOption"],
    {
      shippingCountry: "",
      shippingRegion: "",
      shippingOption: "",
    }
  );

  const fetchShippingCountries = async (checkoutToken) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken
      );

      const formattedCountries = Object.entries(countries).map(
        ([code, name]) => ({
          id: code,
          label: name,
          value: code + "-" + name,
        })
      );

      setShippingCountries(formattedCountries);
      setValue("shippingCountry", formattedCountries[0].value, {
        shouldValidate: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegions = async (countryCode) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      const formattedRegions = Object.entries(subdivisions).map(
        ([code, name]) => ({
          id: code,
          label: name,
          value: code + "-" + name,
        })
      );

      setShippingRegions(formattedRegions);
      setValue("shippingRegion", formattedRegions[0].value, {
        shouldValidate: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShippingOptions = async (
    checkoutToken,
    country,
    region = null
  ) => {
    try {
      const options = await commerce.checkout.getShippingOptions(
        checkoutToken,
        {
          country,
          region,
        }
      );
      const formattedOptions = options.map((option) => ({
        id: option.id,
        label: `${option.description} - ${option.price.formatted_with_symbol}`,
        value: option.id + "-" + option.price.raw,
      }));

      setShippingOptionsList(formattedOptions);
      setValue("shippingOption", options[0].id + "-" + options[0].price.raw, {
        shouldValidate: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checkoutToken.id) {
      console.log(checkoutToken);
      fetchShippingCountries(checkoutToken.id);
    }
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      let idCountry = shippingCountry.split("-")[0];
      fetchRegions(idCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingRegion) {
      let idCountry = shippingCountry.split("-")[0];
      let idRegion = shippingRegion.split("-")[0];

      fetchShippingOptions(checkoutToken.id, idCountry, idRegion);
    }
  }, [shippingRegion]);

  const btnSize = useBreakpointValue(["sm", "sm", "md"]);

  return (
    <Box as="form" mb={8} onSubmit={handleSubmit(onSubmit)} method="post">
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
        <Box>
          <Heading fontSize="xl" fontWeight={600} mb={6}>
            Shipping Information
          </Heading>
          <Box borderColor="gray.200" p={[4, 5]} borderWidth="1px">
            <SimpleGrid spacing={5}>
              <SimpleGrid columns={[1, 2]} spacing={5}>
                <FormControl isInvalid={errorField.firstName}>
                  <FormLabel htmlFor="firstName" fontSize="xs">
                    First Name
                  </FormLabel>
                  <Input
                    focusBorderColor="black"
                    ref={register({
                      required: "Field is required",
                    })}
                    id="firstName"
                    name="firstName"
                    type="text"
                    variant="outline"
                    autoComplete="off"
                    placeholder="First name"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                    // _focus={{ boxShadow: "0 0 0 1px" }}
                  />
                  {errorField.firstName && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.firstName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName" fontSize="xs">
                    Last Name (optional)
                  </FormLabel>
                  <Input
                    focusBorderColor="black"
                    ref={register}
                    id="lastName"
                    name="lastName"
                    type="text"
                    variant="outline"
                    autoComplete="off"
                    placeholder="Last name"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                    // _focus={{ boxShadow: "0 0 0 1px" }}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={[1, 2]} spacing={5}>
                <FormControl isInvalid={errorField.email}>
                  <FormLabel htmlFor="email" fontSize="xs">
                    Email
                  </FormLabel>
                  <Input
                    focusBorderColor="black"
                    ref={register({
                      required: "Field is required",
                      pattern: {
                        value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                        message: "Not a valid email address",
                      },
                    })}
                    id="email"
                    name="email"
                    type="email"
                    variant="outline"
                    autoComplete="off"
                    placeholder="Email"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                    // _focus={{ boxShadow: "0 0 0 1px" }}
                  />
                  {errorField.email && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errorField.phone}>
                  <FormLabel htmlFor="phone" fontSize="xs">
                    Phone Number
                  </FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Field is required" }}
                    render={({ onChange }) => {
                      return (
                        <Input
                          as={NumberFormat}
                          onValueChange={(values) => {
                            onChange(values.value);
                          }}
                          id="phone"
                          variant="outline"
                          autoComplete="off"
                          focusBorderColor="black"
                          placeholder="Phone Number"
                          fontSize="sm"
                          size="sm"
                          borderRadius="none"
                          // _focus={{ boxShadow: "0 0 0 1px" }}
                        />
                      );
                    }}
                  />
                  {errorField.phone && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.phone.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={errorField.address}>
                <FormLabel htmlFor="address" fontSize="xs">
                  Address
                </FormLabel>
                <Input
                  focusBorderColor="black"
                  ref={register({
                    required: "Field is required",
                  })}
                  id="address"
                  name="address"
                  type="text"
                  variant="outline"
                  autoComplete="off"
                  placeholder="Address"
                  fontSize="sm"
                  size="sm"
                  borderRadius="none"
                  // _focus={{ boxShadow: "0 0 0 1px" }}
                />
                {errorField.address && (
                  <FormErrorMessage fontSize="xs">
                    {errorField.address.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <SimpleGrid columns={[1, 2]} spacing={5}>
                <FormControl>
                  <FormLabel htmlFor="building" fontSize="xs">
                    Building / Room (optional)
                  </FormLabel>
                  <Input
                    focusBorderColor="black"
                    ref={register}
                    id="building"
                    name="building"
                    type="text"
                    variant="outline"
                    autoComplete="off"
                    placeholder="Building"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                    // _focus={{ boxShadow: "0 0 0 1px" }}
                  />
                </FormControl>
                <FormControl isInvalid={errorField.zip}>
                  <FormLabel htmlFor="zip" fontSize="xs">
                    ZIP / Postal Code
                  </FormLabel>
                  <Controller
                    name="zip"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Field is required" }}
                    render={({ onChange }) => {
                      return (
                        <Input
                          as={NumberFormat}
                          onValueChange={(values) => {
                            onChange(values.value);
                          }}
                          id="zip"
                          variant="outline"
                          autoComplete="off"
                          focusBorderColor="black"
                          placeholder="ZIP / Postal Code"
                          fontSize="sm"
                          size="sm"
                          borderRadius="none"
                          // _focus={{ boxShadow: "0 0 0 1px" }}
                        />
                      );
                    }}
                  />
                  {errorField.zip && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.zip.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={[1, 2]} spacing={5}>
                <FormControl isInvalid={errorField.shippingCountry}>
                  <FormLabel htmlFor="shippingCountry" fontSize="xs">
                    Shipping Country
                  </FormLabel>
                  <Select
                    focusBorderColor="black"
                    ref={register({
                      required: "Choose one of the options",
                    })}
                    id="shippingCountry"
                    name="shippingCountry"
                    variant="outline"
                    placeholder="- Choose Shipping Country -"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                  >
                    {shippingCountries &&
                      shippingCountries.map((country) => (
                        <option key={country.id} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                  </Select>
                  {errorField.shippingCountry && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.shippingCountry.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errorField.shippingRegion}>
                  <FormLabel htmlFor="shippingRegion" fontSize="xs">
                    Shipping Region
                  </FormLabel>
                  <Select
                    focusBorderColor="black"
                    ref={register({
                      required: "Choose one of the options",
                    })}
                    id="shippingRegion"
                    name="shippingRegion"
                    variant="outline"
                    placeholder="- Choose Shipping Region -"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                  >
                    {shippingRegions &&
                      shippingRegions.map((region) => (
                        <option key={region.id} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                  </Select>
                  {errorField.shippingRegion && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.shippingRegion.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={[1, 2]} spacing={5}>
                <FormControl isInvalid={errorField.shippingCity}>
                  <FormLabel htmlFor="shippingCity" fontSize="xs">
                    Shipping City
                  </FormLabel>
                  <Input
                    focusBorderColor="black"
                    ref={register({
                      required: "Field is required",
                    })}
                    id="shippingCity"
                    name="shippingCity"
                    type="text"
                    variant="outline"
                    autoComplete="off"
                    placeholder="Shipping City"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                    // _focus={{ boxShadow: "0 0 0 1px" }}
                  />
                  {errorField.shippingCity && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.shippingCity.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errorField.shippingOption}>
                  <FormLabel htmlFor="shippingOption" fontSize="xs">
                    Shipping Options
                  </FormLabel>
                  <Select
                    focusBorderColor="black"
                    ref={register({
                      required: "Choose one of the options",
                    })}
                    id="shippingOption"
                    name="shippingOption"
                    variant="outline"
                    placeholder="- Choose Shipping Option -"
                    fontSize="sm"
                    size="sm"
                    borderRadius="none"
                  >
                    {shippingOptionsList &&
                      shippingOptionsList.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </Select>
                  {errorField.shippingOption && (
                    <FormErrorMessage fontSize="xs">
                      {errorField.shippingOption.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </SimpleGrid>
            </SimpleGrid>
          </Box>
        </Box>
        <Box>
          <Box bgColor="gray.50" p={[4, 5]}>
            {cart.id && checkoutToken.id ? (
              <>
                <Heading fontSize="xl" fontWeight={600}>
                  Order Summary
                </Heading>
                <Divider my={5} borderColor="gray.300" />
                <Stack direction="column" spacing={3}>
                  {checkoutToken.live.line_items.map((item) => (
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
                    Rp. {checkoutToken.live.subtotal.raw.toLocaleString()}
                  </Text>
                </Flex>
                <Flex mt={2} fontSize={["xs", "sm"]}>
                  <Text>Estimated Shipping : </Text>
                  <Text flex="1" textAlign="right">
                    {shippingOption
                      ? `Rp. ${Number(
                          shippingOption.split("-")[1]
                        ).toLocaleString()}`
                      : `Rp. 0`}
                  </Text>
                </Flex>
                <Divider my={5} borderColor="gray.300" />
                <Flex mt={2} fontSize={["xs", "sm"]}>
                  <Text>Total : </Text>
                  <Text flex="1" textAlign="right">
                    {shippingOption
                      ? `Rp. ${(
                          checkoutToken.live.subtotal.raw +
                          Number(shippingOption.split("-")[1])
                        ).toLocaleString()}`
                      : `Rp. ${checkoutToken.live.subtotal.raw.toLocaleString()}`}
                  </Text>
                </Flex>
                <Flex mt={5}>
                  <Button
                    size={btnSize}
                    fontSize={["sm", "sm", "md"]}
                    width="full"
                    type="submit"
                    variant="solid"
                    colorScheme="black"
                    bgColor="black"
                    borderRadius="none"
                  >
                    Review & Pay
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
