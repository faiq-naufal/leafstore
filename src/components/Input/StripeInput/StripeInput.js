import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { CardNumberElement } from "@stripe/react-stripe-js";

export default function StripeInput({ onChange, as, isInvalid, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Input
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      background="red"
      as={as}
      onChange={onChange}
      variant="outline"
      pt="6px"
      pl={3}
      pr={3}
      pb={0}
      aria-invalid={isInvalid}
      isInvalid={isInvalid}
      fontSize="sm"
      height="2rem"
      borderRadius="none"
      borderColor="#E2E8F0"
      boxShadow={
        isInvalid ? `0 0 0 2px #E53E3E` : isFocused ? `0 0 0 2px` : "none"
      }
      color={isInvalid ? "#E53E3E" : "inherit"}
      _placeholder={{
        color: "#aab7c4",
      }}
      // _invalid={{}}
      // options={{
      //   style: {
      //     base: {},
      //     invalid: {
      //       boxShadow: "0 0 0 2px #E53E3E",
      //     },
      //   },
      // }}
      {...rest}
    />
  );
}

const StripeCardNumber = ({ children }) => {
  return <CardNumberElement />;
};
