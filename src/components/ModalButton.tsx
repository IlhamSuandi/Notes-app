"use client";

import {
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import AddNoteForm from "./AddNoteForm";

interface IModalButton {
  placeholder?: string;
}

export default function ModalButton({
  placeholder = "add new note",
}: IModalButton) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonGroup isAttached colorScheme="purple" onClick={onOpen}>
        <Button>{placeholder}</Button>

        <IconButton aria-label="Add Note" icon={<IoMdAdd />} />
      </ButtonGroup>
      <AddNoteForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}
