"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Highlight,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { CiMenuKebab } from "react-icons/ci";
import MenuEditNote from "./MenuEditNote";

interface INoteCard {
  noteId: string;
  noteTitle: string;
  noteBody: string;
  createdAt: string;
}

export default function NoteCard({
  noteId,
  noteTitle,
  noteBody,
  createdAt,
}: INoteCard) {
  const searchParams = useSearchParams().get("search");

  const router = useRouter();

  return (
    <Card
      maxW="xs"
      flex="0 1 300px"
      h="400px"
      borderTop="8px"
      borderColor="purple.400"
      bg="white"
      cursor="pointer"
      _hover={{
        zIndex: "100",
        transform: "scale(1.05)",
        transitionDuration: "500ms",
      }}
    >
      <CardHeader color="gray.700">
        <Flex alignItems="center" justifyContent="space-between">
          <Tooltip
            openDelay={500}
            placement="bottom-start"
            label={noteTitle}
            aria-label={noteTitle}
            zIndex={99999}
          >
            <Heading flexBasis="80%" noOfLines={1} as="h1" fontSize="2rem">
              <Highlight
                query={searchParams || ""}
                styles={{ bg: "blue.500", color: "white" }}
              >
                {noteTitle}
              </Highlight>
            </Heading>
          </Tooltip>

          <MenuEditNote
            note={{
              id: noteId,
              title: noteTitle,
              body: noteBody,
              createdAt: createdAt,
            }}
          >
            <Center>
              <CiMenuKebab size={28} />
            </Center>
          </MenuEditNote>
        </Flex>
      </CardHeader>
      <CardBody onClick={() => router.push(`/details/${noteId}`)}>
        <Text noOfLines={8}>
          <Highlight
            query={searchParams || ""}
            styles={{ bg: "blue.500", color: "white" }}
          >
            {noteBody}
          </Highlight>
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>
          <Highlight
            query={searchParams || ""}
            styles={{ bg: "blue.500", color: "white" }}
          >
            {createdAt}
          </Highlight>
        </Text>
      </CardFooter>
    </Card>
  );
}
