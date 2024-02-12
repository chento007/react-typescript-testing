import React from "react";
import { CiCircleRemove } from "react-icons/ci";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteProductByIdMutation } from "../../store/features/product/productApiSlice";

export default function ModalDeleteProduct({ id }) {
  console.log(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteProductById] = useDeleteProductByIdMutation();

  const handleDeleteProduct = async (id: string) => {
    try {
      console.log("product id : ", id);
      const response = await deleteProductById(id);
      console.log(response);
      onOpenChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button color="danger" onPress={onOpen} className="mx-4">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Are you sure you want to delete?
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center">
                  <CiCircleRemove className="text-red-600 text-[150px]" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => handleDeleteProduct(id)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
