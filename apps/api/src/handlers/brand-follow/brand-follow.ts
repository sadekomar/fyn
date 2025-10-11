import { createBrandFollow } from "./create-brand-follow";
import { readFollowedBrands } from "./read-brand-follows";

export { createBrandFollow, readFollowedBrands };

type CreateBrandFollowUserRequest = {
  type: "user";
  brandId: string;
  userId: string;
};

type CreateBrandFollowGuestUserRequest = {
  type: "guest";
  brandId: string;
  guestUserId: string;
};

export type CreateBrandFollowRequest =
  | CreateBrandFollowUserRequest
  | CreateBrandFollowGuestUserRequest;

type CreateBrandFollowSuccessResponse = {
  status: "success";
  message: "Brand followed successfully" | "Brand unfollowed successfully";
};

type CreateBrandFollowErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateBrandFollowResponse =
  | CreateBrandFollowSuccessResponse
  | CreateBrandFollowErrorResponse;

// read
type ReadFollowedBrandsUserRequest = {
  type: "user";
  userId: string;
};
type ReadFollowedBrandsGuestUserRequest = {
  type: "guest";
  guestUserId: string;
};

export type ReadFollowedBrandsRequest =
  | ReadFollowedBrandsUserRequest
  | ReadFollowedBrandsGuestUserRequest;

export type ReadFollowedBrandsResponse = {
  brandId: string;
}[];
