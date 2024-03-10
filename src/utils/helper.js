import { HStack, Text } from "@chakra-ui/react";

export const formatCompactNumber = (number) => {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(2).replace(/\.0$/, "") + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(3).replace(/\.0$/, "") + "T";
  }
};

export const CheckPercentage = ({ val }) => {
  if (val > 0) {
    return (
      <HStack ml={-4}>
        <Text color={"green.500"}>+{val?.toFixed(2)}%</Text>
      </HStack>
    );
  } else {
    return (
      <HStack ml={-4}>
        <Text color={"red.500"}>-{Math.abs(val?.toFixed(2))}%</Text>
      </HStack>
    );
  }
};
