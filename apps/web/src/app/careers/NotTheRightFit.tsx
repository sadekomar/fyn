import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  usePostNewsletter,
  PostNewsletter,
  NewsletterType,
} from "@/queries/applicants.hook";

export function NotTheRightFit() {
  const mutation = usePostNewsletter();
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const newsletterSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div className="space-y-4 rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#E9E8F6] to-[#F3F2FB] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
      {!isEmailSubmitted ? (
        <>
          <div className="flex flex-col gap-1">
            <h5 className="text-[25px] font-semibold">Not the right fit?</h5>
            <p className="text-gray-600">
              Join our talent community to stay updated on new opportunities.
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={newsletterSchema}
            onSubmit={async (values, actions) => {
              const valuesWithType: PostNewsletter = {
                email: values.email,
                type: NewsletterType.CAREERS,
              };

              await mutation.mutateAsync(valuesWithType);
              setIsEmailSubmitted(true);
              actions.setSubmitting(false);
              actions.resetForm();
            }}
          >
            {(values) => (
              <Form className="flex flex-col gap-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-gray-300 bg-[#ffffff] px-3 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
                <button
                  type="submit"
                  disabled={values.isSubmitting || mutation.isPending}
                  className="w-full rounded-full bg-[#e8e8e8] py-2 font-semibold text-black"
                >
                  Join Talent Network
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <h5 className="text-[25px] font-semibold">Thank you</h5>
          <p className="text-gray-600">
            You have successfully joined our newsletter and will be notified
            about any upcoming opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
