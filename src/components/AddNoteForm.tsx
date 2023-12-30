"use client";
import { ADD_NOTE } from "@/controller/mutation";
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
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IFormType {
  title: string;
  bodyText: string;
}

interface INote {
  title: string;
  body: string;
  createdAt: string;
}

interface IModalForm {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNoteForm({ isOpen, onClose }: IModalForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<IFormType>();

  const [mutateNote] = useMutation(ADD_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const toast = useToast();

  const router = useRouter();

  const finalRef = useRef(null);

  const onSubmit: SubmitHandler<IFormType> = ({ title, bodyText }) => {
    const datenow = new Date(Date()).toLocaleDateString("en-US");
    const newNote: INote = {
      title: title,
      body: bodyText,
      createdAt: datenow,
    };
    mutateNote({ variables: newNote }).finally(() => {
      onClose();
      router.refresh();
      reset();
      toast({
        position: "bottom-right",
        title: "Note created.",
        description: "Note successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
              isLoading={isSubmitted}
              type="submit"
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
