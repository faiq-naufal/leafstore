import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// setup light/dark mode component defaults
const components = {
  Link: {
    baseStyle: (props) => ({
      color: "blue.500",
    }),
  },
  Heading: {
    baseStyle: (props) => ({
      fontWeight: 700,
    }),
  },
  Button: {
    baseStyle: (props) => ({
      borderRadius: "4px",
    }),
  },
};

// setup light/dark mode global defaults
const styles = {
  global: (props) => ({
    "html, body, #__next, main": {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      minHeight: "100%",
      minHeight: "calc(var(--vh, 1vh) * 100)",
      height: "auto",
      overflowX: "hidden",
    },
    body: {
      bg: "white",
    },
    div: {
      // color: "blue.800",
    },
  }),
};

const additionalStyles = {
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
};

export const theme = extendTheme({
  components,
  styles,
  ...additionalStyles,
});

export default function Theme({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
