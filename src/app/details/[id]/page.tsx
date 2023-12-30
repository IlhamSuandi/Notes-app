import { GET_NOTE } from "@/controller/query";
import { getClient } from "@/lib/apolloClient";
import { Container } from "@chakra-ui/react";
import { INote } from "../../../../types";
import DetailCard from "@/components/DetailCard";

export default async function page({ params }: { params: { id: string } }) {
  const { data } = await getClient().query({
    query: GET_NOTE,
    variables: { id: params.id },
  });

  const note: INote = data.note;

  return (
    <Container
      mt={10}
      maxW="container.xl"
      bgColor="whitesmoke"
      color="gray.600"
      rounded="1rem"
    >
      <DetailCard
        id={note.id}
        title={note.title}
        body={note.body}
        createdAt={new Date(note.createdAt).toLocaleDateString("id-ID")}
      />
    </Container>
  );
}
