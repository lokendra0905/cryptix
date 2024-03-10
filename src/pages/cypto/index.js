import { Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { CoinData } from "./CoinData";
import { PriceChart } from "./PriceChart";

export const Crypto = ({ id }) => {
  return (
    <Flex gap={10} minH={"80vh"}>
      <CoinData coinId={id} />
      <Center>
        <Divider orientation="vertical" borderColor={"gray.400"} />
      </Center>
      <PriceChart id={id} />
    </Flex>
  );
};
