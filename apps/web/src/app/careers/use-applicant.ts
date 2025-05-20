import { useMutation } from "@tanstack/react-query";
import { HttpMethods, httpService } from "../../lib/queries/http.service";

export enum NewsletterType {
  CAREERS = "CAREERS",
  NEWSLETTER = "NEWSLETTER",
}

export type PostApplicant = {
  name: string;
  email: string;
  phone: string;
  whyLoom: string;
  whyYou: string;
};

type CreateApplicantResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  whyYou: string;
  whyLoom: string;
};

export type PostNewsletter = {
  email: string;
  type: NewsletterType;
};

export const usePostApplicant = () => {
  return useMutation({
    mutationFn: async (data: PostApplicant) =>
      await httpService<CreateApplicantResponse>(HttpMethods.POST, "/apply", {
        isServer: false,
        isResponseJson: true,
        isDataJson: true,
        data: data,
      }),
    onError: (error) => {
      console.error("Error submitting application:", error);
    },
  });
};

export const usePostNewsletter = () => {
  return useMutation({
    mutationFn: (data: PostNewsletter) =>
      httpService(HttpMethods.POST, "/newsletter", {
        isServer: false,
        isResponseJson: true,
        isDataJson: true,
        data: data,
      }),
  });
};
