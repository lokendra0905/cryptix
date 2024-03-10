import { COINDATA, STATUS } from "@/constants";
import { useCoinStore } from "@/store/coins";
import { CheckPercentage, formatCompactNumber } from "@/utils/helper";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { map } from "lodash";
import React, { useEffect } from "react";

export const CoinData = ({ coinId }) => {
  const { getCoinDetailAction, getCoinDetailStatus, coinDetails } = useCoinStore((s) => ({
    getCoinDetailAction: s.getCoinDetailAction,
    getCoinDetailStatus: s.getCoinDetailStatus,
    coinDetails: s.coinDetails,
  }));

  useEffect(() => {
    getCoinDetailAction({ vs_currency: "usd" }, coinId);
  }, [getCoinDetailAction, coinId]);

  const { name, symbol, id, categories, market_cap_rank, market_data, image } = coinDetails || {};

  const {
    market_cap,
    fully_diluted_valuation,
    total_volume,
    max_supply,
    total_supply,
    circulating_supply,
    current_price,
    price_change_percentage_24h,
  } = market_data || {};

  const MarketData = [
    { title: "Market Cap", value: market_cap?.usd },
    { title: "Fully Diluted Valuation", value: fully_diluted_valuation?.usd },
    { title: "Volume", value: total_volume?.usd },
    { title: "Circulating Supply", value: circulating_supply },
    { title: "Total Supply", value: total_supply },
    { title: "Max Supply", value: max_supply },
  ];

  return (
    <Box flex={2}>
      {getCoinDetailStatus === STATUS.FETCHING ? (
        <Center minH={"70vh"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Stack>
          <HStack spacing={3}>
            <Avatar src={image?.small} size={"sm"} />
            <Flex gap={3} align={"baseline"}>
              <Text fontSize={"x-large"} fontWeight={600}>
                {name}
              </Text>
              <Text color={"gray.500"}>{symbol?.toUpperCase()} Price</Text>
              <Box>
                <Tag size={"sm"}>#{market_cap_rank}</Tag>
              </Box>
            </Flex>
          </HStack>
          <HStack spacing={10}>
            <Heading>${current_price?.usd.toFixed(2)}</Heading>
            <Box mt={2}>
              <CheckPercentage val={price_change_percentage_24h} />
            </Box>
          </HStack>
          <Box>
            {map(MarketData, ({ title, value }) => (
              <Box>
                <HStack py={4} justify={"space-between"}>
                  <Text>{title}</Text>
                  <Text textAlign={"right"}>${value?.toLocaleString("en-US")}</Text>
                </HStack>
                <Divider borderColor={"gray.400"} />
              </Box>
            ))}
          </Box>
        </Stack>
      )}
    </Box>
  );
};
