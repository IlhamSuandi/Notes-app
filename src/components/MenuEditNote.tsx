"use client";

import { DELETE_NOTE } from "@/controller/mutation";
import { GET_NOTES } from "@/controller/query";
import { useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";

import { CiTrash, CiPen } from "react-icons/ci";
import UpdateNoteForm from "./UpdateNoteForm";
import { INote } from "../../types";

interface IMenuEditNote {
  note: INote;
  children: ReactNode;
}

export default function MenuEditNote({
  note: { id, title, body, createdAt },
  children,
}: IMenuEditNote) {
  const [deleteNote, { loading }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });
  const path = usePathname();

  const router = useRouter();

  const {
    onOpen: onAlertOpen,
    isOpen: isAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const {
    onOpen: onModalOpen,
    isOpen: isModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu>
      {({ isOpen: isMenuOpen }) => (
        <>
          <MenuButton
            aria-label="menu"
            variant="ghost"
            p={0}
            isActive={isMenuOpen}
            as={Button}
          >
            {children}
          </MenuButton>
          <MenuList>
            <MenuItem icon={<CiPen size={24} />} onClick={onModalOpen}>
              Edit
            </MenuItem>
            <MenuItem icon={<CiTrash size={24} />} onClick={onAlertOpen}>
              Delete
            </MenuItem>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onAlertClose}
              isOpen={isAlertOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>Delete Note?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to delete note: {title}
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onAlertClose}>
                    No
                  </Button>
                  <Button
                    isLoading={loading}
                    colorScheme="red"
                    ml={3}
                    onClick={() => {
                      deleteNote({
                        variables: {
                          id: id,
                        },
                      })
                        .then(() => {
                          onAlertClose();
                        })
                        .finally(() => {
                          path === "/"
                            ? router.refresh()
                            : (router.push("/"), router.refresh());
                        });
                    }}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenuList>

          <UpdateNoteForm
            noteId={id}
            noteTitle={title}
            noteBody={body}
            isOpen={isModalOpen}
            onClose={onModalClose}
          />
        </>
      )}
    </Menu>
  );
}
