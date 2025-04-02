import { useMutation } from "@tanstack/react-query";
import { HttpMethods, httpService } from "./http.service";

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

export type PostNewsletter = {
  email: string;
  type: NewsletterType;
};

export const usePostApplicant = () => {
  return useMutation({
    mutationFn: async (event: PostApplicant) =>
      await httpService(HttpMethods.POST, "/apply", event),
    onError: (error) => {
      console.error("Error submitting application:", error);
    },
  });
};

export const usePostNewsletter = () => {
  return useMutation({
    mutationFn: (event: PostNewsletter) =>
      httpService(HttpMethods.POST, "/newsletter", event),
  });
};
