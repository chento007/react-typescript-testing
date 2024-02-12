import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CiUser } from "react-icons/ci";
import * as Yup from "yup";
import { useCreateProductMutation } from "../../store/features/product/productApiSlice";
import LoadingComponent from "../LoadingComponent";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Photo is required"),
  price: Yup.string().required("Price is required"),
  //   photo: Yup.string().required("Photo is required"),
});

export default function ModalAddNewProduct() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  const handleCreateNewProduct = async ({ title, description, price }) => {
    try {
      const response = await createProduct({
        title,
        description,
        price,
        user : "65c47a9c4dcaebc768fdd400",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYObPe36hfFckE4bT5l3FTMuWpvG2PBIYpNJEKmLxJA&s",
      }).unwrap();

      console.log(response);

      // Show success toast immediately
      toast.success("You have been created product successfully.");
    } catch (error: any) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Create New
      </Button>
      <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Product
              </ModalHeader>
              <ModalBody>
                <div className="w-full">
                  <Formik
                    initialValues={{
                      title: "",
                      description: "",
                      price: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      setTimeout(() => {
                        console.log(values);
                        handleCreateNewProduct(values);
                        resetForm();
                      }, 1000);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="w-full">
                        {/* title */}
                        <div className="mb-6">
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title :
                          </label>

                          <div className="relative">
                            <Field
                              type="text"
                              name="title"
                              className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter your title here"
                              required
                            />
                          </div>
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500 text-[13px]"
                          />
                        </div>

                        {/* price */}
                        <div className="mb-6">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price :
                          </label>

                          <div className="relative">
                            <Field
                              type="number"
                              name="price"
                              className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter your price here"
                              required
                            />
                          </div>
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-[13px]"
                          />
                        </div>

                        {/* description */}
                        <div className="mb-6">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description :
                          </label>

                          <div className="relative">
                            <Field
                              as="textarea"
                              name="description"
                              className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter your description here"
                              required
                            />
                          </div>
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-[13px]"
                          />
                        </div>

                        {/* Submit */}
                        <div className="relative z-0 w-full mb-6 group flex justify-center">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Create New Product
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
