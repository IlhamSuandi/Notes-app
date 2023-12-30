import NoteCard from "@/components/NoteCard";
import { getClient } from "@/lib/apolloClient";
import { Box, Container, Heading, Center, Flex, Text } from "@chakra-ui/react";
import { INote } from "../../types";
import ModalButton from "@/components/ModalButton";
import { GET_NOTES } from "@/controller/query";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await getClient().query({
    query: GET_NOTES,
  });

  const search = searchParams.search;

  const sortedNotes = [...data?.notes].sort(
    (a: any, b: any) =>
      new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
  );

  const filteredNotes = sortedNotes
    .filter(({ body, title, createdAt }) => {
      return (
        body.includes(search as string) ||
        title.includes(search as string) ||
        createdAt.includes(search as string)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    );

  const notes: INote[] =
    search === "" || search === undefined ? sortedNotes : filteredNotes;

  return (
    <Container
      mt={10}
      maxW="100%"
      bgColor="whitesmoke"
      color="gray.600"
      rounded="1rem"
    >
      <Box>
        <Center pb="2rem">
          <Heading>Notes</Heading>
        </Center>
        <Flex wrap="wrap" justifyContent="center" gap={10}>
          {notes.length ? (
            notes.map(({ id, title, body, createdAt }) => (
              <NoteCard
                key={id}
                noteId={id}
                noteTitle={title}
                noteBody={body}
                createdAt={new Date(createdAt).toLocaleDateString("id-ID")}
              />
            ))
          ) : (
            <Text>There is no Note...</Text>
          )}
        </Flex>
      </Box>
      <Box
        pos="fixed"
        left="50%"
        bottom="10%"
        transform="translate(-50%, 0)"
        zIndex="99999"
      >
        <ModalButton />
      </Box>
    </Container>
  );
}
