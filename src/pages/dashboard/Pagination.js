import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Center, HStack, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

export const Pagination = ({ currentPage, setCurrentPage }) => {
  const goToNext = () => {
    setCurrentPage((p) => p + 1);
  };

  const goToPrev = () => {
    setCurrentPage((p) => p - 1);
  };

  return (
    <Center p={3}>
      <HStack>
        <Tooltip label="Previous">
          <Button
            variant="flushed"
            onClick={goToPrev}
            size="sm"
            role="group"
            mr={-3}
            isDisabled={currentPage == 1}
          >
            <ArrowLeftIcon transition="all 0.2s" _groupHover={{ mr: "10px" }} />
          </Button>
        </Tooltip>
        <Center>
          <Text fontSize={'large'} mr={-2}>{`Page ${currentPage || 1}`}</Text>
        </Center>
        <Tooltip label="Next">
          <Button
            variant="flushed"
            onClick={goToNext}
            role="group"
            size="sm"
            ml={-1}
          >
            <ArrowRightIcon transition="all 0.2s" _groupHover={{ ml: "10px" }} />
          </Button>
        </Tooltip>
      </HStack>
    </Center>
  );
};
