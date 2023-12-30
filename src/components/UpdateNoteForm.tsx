"use client";

import { UPDATE_NOTE } from "@/controller/mutation";
import { GET_NOTES } from "@/controller/query";
import { useMutation } from "@apollo/client";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormType {
  title: string;
  bodyText: string;
}

interface INote {
  id: string;
  title: string;
  body: string;
}

interface IModalForm {
  noteId: string;
  noteTitle: string;
  noteBody: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateNoteForm({
  noteId,
  noteTitle,
  noteBody,
  isOpen,
  onClose,
}: IModalForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IFormType>({
    defaultValues: { title: noteTitle, bodyText: noteBody },
  });

  const [mutateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const toast = useToast();

  const router = useRouter();

  const finalRef = useRef(null);

  const onSubmit: SubmitHandler<IFormType> = ({ title, bodyText }) => {
    const newNote: INote = {
      id: noteId,
      title: title,
      body: bodyText,
    };
    mutateNote({ variables: newNote })
      .then(() => {
        router.refresh();
      })
      .finally(() => {
        toast({
          position: "bottom-right",
          title: "Note Updated!",
          description: "Note successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={errors.title ? true : false}>
              <Box mb={5}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                />
                {errors.title ? (
                  <FormErrorMessage>Title is required</FormErrorMessage>
                ) : (
                  <FormHelperText>Title for note</FormHelperText>
                )}
              </Box>
            </FormControl>

            <FormControl isRequired isInvalid={errors.bodyText ? true : false}>
              <FormLabel>Note</FormLabel>
              <Textarea
                size="sm"
                placeholder="Body Text"
                {...register("bodyText", { required: true })}
              />
              {errors.bodyText ? (
                <FormErrorMessage>Body Text is required</FormErrorMessage>
              ) : (
                <FormHelperText>
                  everything that you want to remember
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >
              Update Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
