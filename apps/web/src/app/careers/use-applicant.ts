import { useMutation } from "@tanstack/react-query";
import {
  clientHttp,
  HttpMethods,
  httpService,
} from "../../lib/queries/http.service";
import { Endpoints } from "@/api/endpoints";

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
      await clientHttp.post<PostApplicant, CreateApplicantResponse>(
        Endpoints.Apply,
        data,
      ),
    onError: (error) => {
      console.error("Error submitting application:", error);
    },
  });
};

export const usePostNewsletter = () => {
  return useMutation({
    mutationFn: (data: PostNewsletter) =>
      clientHttp.post<PostNewsletter, CreateApplicantResponse>(
        Endpoints.Newsletter,
        data,
      ),
  });
};
