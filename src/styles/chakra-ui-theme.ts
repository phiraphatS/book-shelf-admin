import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Noto Serif Thai', 'Rubik', sans-serif",
    body: "'Noto Serif Thai', 'Rubik', sans-serif",
  },
  colors: {
    brand: {
      500: "#26A69A", // The teal color used in the sidebar
    },
    gray: {
      100: "#F5F5F5", // Light gray background
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

export default theme;