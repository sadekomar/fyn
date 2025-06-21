import { createLike } from "./create-like";
import { readLike } from "./read-like";

export { createLike, readLike };

// create
type CreateLikeUserRequest = {
  type: "user";
  itemId: string;
  userId: string;
};

type CreateLikeGuestUserRequest = {
  type: "guest";
  itemId: string;
  guestUserId: string;
};

export type CreateLikeRequest =
  | CreateLikeUserRequest
  | CreateLikeGuestUserRequest;

type CreateLikeSuccessResponse = {
  status: "success";
  message: "Like created successfully";
};

type CreateLikeErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateLikeResponse =
  | CreateLikeSuccessResponse
  | CreateLikeErrorResponse;

// read
type ReadLikeUserRequest = {
  type: "user";
  itemId: string;
  userId: string;
};

type ReadLikeGuestUserRequest = {
  type: "guest";
  itemId: string;
  guestUserId: string;
};

export type ReadLikeRequest = ReadLikeUserRequest | ReadLikeGuestUserRequest;

export type ReadLikeResponse = {
  isLiked: boolean;
};

export type ErrorResponse = {
  status: "error";
  error: { root: string[] };
};

// read likes
type ReadLikesUserRequest = {
  type: "user";
  userId: string;
};

type ReadLikesGuestRequest = {
  type: "guest";
  guestUserId: string;
};

export type ReadLikesRequest = ReadLikesUserRequest | ReadLikesGuestRequest;
