"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { INote } from "../../types";
import { useRouter } from "next/navigation";
import MenuEditNote from "./MenuEditNote";

export default function DetailCard({ id, body, title, createdAt }: INote) {
  const router = useRouter();
  return (
    <Box>
      <IconButton
        aria-label="back"
        variant="ghost"
        flexBasis="10%"
        mb="1rem"
        onClick={() => router.push("/")}
      >
        <IoMdArrowRoundBack size={36} color="#7B56D1" />
      </IconButton>
      <Center>
        <Card variant="outline" w="100%">
          <CardHeader>
            <Heading py={5}>{title}</Heading>
            <Text>{createdAt}</Text>
          </CardHeader>
          <CardBody>{body}</CardBody>
        </Card>
      </Center>
      <Box pos="fixed" left="50%" bottom="10%" transform="translate(-50%, 0)">
        <MenuEditNote
          note={{
            id: id,
            title: title,
            body: body,
            createdAt: createdAt,
          }}
        >
          <ButtonGroup isAttached colorScheme="purple">
            <Button as="div" roundedRight={0}>
              Edit Note
            </Button>

            <IconButton
              as="span"
              aria-label="Edit Note"
              roundedLeft={0}
              icon={<IoMdAdd />}
            />
          </ButtonGroup>
        </MenuEditNote>
      </Box>
    </Box>
  );
}
