"use client";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { get } = useSearchParams();
  const params = get("search")?.toString();
  const [text, setText] = useState<string | undefined>(params);
  const [query] = useDebounce(text, 200);

  useEffect(() => {
    if (!query) router.push(pathname);
    else router.push(`?search=${query}`);
  }, [pathname, query, router]);

  return (
    <Container as="header" w="100%" maxW="100%" py="2rem" bg="white">
      <Flex
        as="nav"
        maxW="container.xl"
        margin="0 auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h1" fontSize={["2xl", "3xl", "4xl"]} color="gray.600">
          My Notes.
        </Heading>
        <InputGroup w={["150px", "200px", "fit-content"]} bgColor="white">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={text}
            onChange={(input) => setText(input.target.value)}
          />
        </InputGroup>
      </Flex>
    </Container>
  );
}
