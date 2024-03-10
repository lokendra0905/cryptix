import { NavLinks } from "@/constants";
import { Box, HStack, Input, InputGroup, Text } from "@chakra-ui/react";
import { map } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <Box>
      <Box width={"100%"} p={5} px={10} borderBottom={"1px solid"} borderBottomColor={"gray.500"}>
        <HStack justify={"space-between"} width={"100%"}>
          <HStack spacing={10}>
            <Link href={"/"}>
              <Image width={150} height={100} src={"/assets/logo.png"} alt="logo" />
            </Link>
            <HStack spacing={10}>
              {map(NavLinks, (nav) => {
                return (
                  <Link href={nav.route}>
                    <Text fontWeight={500}>{nav.title}</Text>
                  </Link>
                );
              })}
            </HStack>
          </HStack>
          <InputGroup width={"250px"}>
            <Input placeholder="Search Crypto" />
          </InputGroup>
        </HStack>
      </Box>
    </Box>
  );
};
