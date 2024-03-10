import { Box, Center, Flex, Heading, Spinner, Tab, TabList, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCoinStore } from "@/store/coins";
import { map } from "lodash";
import { STATUS, chartDays } from "@/constants";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const PriceChart = ({ id }) => {
  const [days, setDays] = useState(1);

  const { getCoinChartAction, getCoinChartStatus, chartData } = useCoinStore((s) => ({
    getCoinChartAction: s.getCoinChartAction,
    getCoinChartStatus: s.getCoinChartStatus,
    chartData: s.chartData,
  }));

  useEffect(() => {
    getCoinChartAction({ days, vs_currency: "usd" }, id);
  }, [getCoinChartAction, days, id]);

  const { prices } = chartData || {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0.5,
      },
    },
  };

  return (
    <Box flex={6}>
      <Tabs variant="unstyled">
        <TabList>
          {map(chartDays, (day) => (
            <Tab _selected={{ color: "white", bg: "green.400" }} onClick={() => setDays(day.value)}>
              {day.label}
            </Tab>
          ))}
          {/* <Tab _selected={{ color: "white", bg: "blue.500" }}>Tab 1</Tab>
           */}
        </TabList>
      </Tabs>
      {getCoinChartStatus === STATUS.FETCHING ? (
        <Center minH={"70vh"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Box marginTop={10}>
          {prices?.length && (
            <Line
              data={{
                labels: prices?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = `${date.getHours()}:${date.getMinutes()}`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: prices?.map((coin) => coin[1]),
                    label: "Price",
                    borderColor: prices[0][1] > prices[prices.length - 1][1] ? "red" : "green",
                    borderWidth: 2,
                  },
                ],
              }}
              options={options}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
