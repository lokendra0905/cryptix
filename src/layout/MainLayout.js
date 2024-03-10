import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <Stack minH={"100vh"} background={"#171924"} spacing={"10"}>
      <Header />
      <Box px={10}>{children}</Box>
    </Stack>
  );
};
