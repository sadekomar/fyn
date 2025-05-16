import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostApplicant } from "@/queries/applicants.hook";
import { motion } from "framer-motion";

export function ApplicationForm() {
  const mutation = usePostApplicant();
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9+\-() ]+$/, "Invalid phone number"),
    whyLoom: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
    whyYou: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  return (
    <section className="mx-auto max-w-[100ch] py-8">
      <div className="flex min-h-[540px] items-center justify-between gap-4 rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#E9E8F6] to-[#F3F2FB] p-8 shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
        {isApplicationSubmitted ? (
          <div className="flex flex-col gap-1">
            <h5 className="text-[25px] font-semibold">Thank you</h5>
            <p className="text-gray-600">
              Your application has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
            <h3 className="max-w-[10ch] text-[31.25px] leading-[1.3em] font-bold">
              Apply for this internship
            </h3>

            <Formik
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                await mutation.mutateAsync(values);
                actions.setSubmitting(false);
                setIsApplicationSubmitted(true);
              }}
              initialValues={{
                name: "",
                email: "",
                phone: "",
                whyLoom: "",
                whyYou: "",
              }}
            >
              {({ isSubmitting }) => (
                <Form className="application-form max-w-[60ch] flex-grow">
                  <div className="">
                    <label
                      htmlFor="name"
                      className="mt-2.5 mb-1 block text-sm font-bold"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="h-10 w-full rounded-md border-2 border-solid border-[#cfcfcf] bg-white p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mt-2.5 mb-1 block text-sm font-bold"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="h-10 w-full rounded-md border-2 border-solid border-[#cfcfcf] bg-white p-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mt-2.5 mb-1 block text-sm font-bold"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      id="phone"
                      className="h-10 w-full rounded-md border-2 border-solid border-[#cfcfcf] bg-white p-2"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whyLoom"
                      className="mt-2.5 mb-1 block text-sm font-bold"
                    >
                      Why Loom? (100-300 words)
                    </label>
                    <Field
                      as="textarea"
                      name="whyLoom"
                      id="whyLoom"
                      className="h-20 w-full rounded-md border-2 border-solid border-[#cfcfcf] bg-white p-2"
                    />
                    <ErrorMessage
                      name="whyLoom"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whyYou"
                      className="mt-2.5 mb-1 block text-sm font-bold"
                    >
                      Why you? (100-300 words)
                    </label>
                    <Field
                      as="textarea"
                      name="whyYou"
                      id="whyYou"
                      className="h-20 w-full rounded-md border-2 border-solid border-[#cfcfcf] bg-white p-2"
                    />
                    <ErrorMessage
                      name="whyYou"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <motion.button
                      type="submit"
                      className="h-10 w-full rounded-full bg-[#A6A2DE] px-4 font-semibold text-white disabled:opacity-50"
                      disabled={isSubmitting || mutation.isPending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {mutation.isPending ? (
                        <span className="loading-spinner">
                          <span className="spinner-icon"></span>
                          Appyling...
                        </span>
                      ) : (
                        "Apply"
                      )}
                    </motion.button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </section>
  );
}
