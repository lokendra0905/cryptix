import { STATUS, TABLEHEAD } from "@/constants";
import { CheckPercentage, formatCompactNumber } from "@/utils/helper";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { useCoinStore } from "@/store/coins";
import { useRouter } from "next/navigation";

export const CoinTable = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { getCoinListAction, getCoinListStatus, coinData } = useCoinStore((s) => ({
    getCoinListAction: s.getCoinListAction,
    getCoinListStatus: s.getCoinListStatus,
    coinData: s.coinData,
  }));

  const handleRoute = (id) => {
    router.push(`/crypto/${encodeURIComponent(id)}`);
  };

  useEffect(() => {
    getCoinListAction({
      vs_currency: "usd",
      per_page: 20,
      page,
      sparkline: true,
      price_change_percentage: "1h",
      precision: 2,
    });
  }, [getCoinListAction, page]);
  return (
    <Box>
      {getCoinListStatus === STATUS.FETCHING ? (
        <Center minH={"70vh"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                {map(TABLEHEAD, (head, index) => (
                  <Th key={index} color={"white"}>
                    {head}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {map(coinData, (coin) => {
                const {
                  market_cap_rank,
                  image,
                  name,
                  id,
                  symbol,
                  current_price,
                  price_change_percentage_1h_in_currency,
                  market_cap,
                  total_volume,
                  price_change_percentage_24h,
                } = coin || {};
                return (
                  <Tr
                    key={id}
                    cursor={"pointer"}
                    _hover={{ backgroundColor: "gray.800" }}
                    onClick={() => handleRoute(id)}
                  >
                    <Td>{market_cap_rank}</Td>
                    <Td>
                      <HStack>
                        <Avatar src={image} size={"sm"} />
                        <Text>{`${name} (${symbol.toUpperCase()})`}</Text>
                      </HStack>
                    </Td>
                    <Td>${current_price}</Td>
                    <Td>
                      <CheckPercentage val={price_change_percentage_1h_in_currency} />
                    </Td>
                    <Td>
                      <CheckPercentage val={price_change_percentage_24h} />
                    </Td>
                    <Td> ${formatCompactNumber(market_cap)}</Td>
                    <Td>${formatCompactNumber(total_volume)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination currentPage={page} setCurrentPage={setPage} />
    </Box>
  );
};
